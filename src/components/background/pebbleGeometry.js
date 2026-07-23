import * as THREE from "three";

/**
 * Deterministic PRNG (mulberry32) so each pebble's irregular shape
 * is stable across re-renders without needing an external noise library.
 */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds a single irregular, rounded "pebble" geometry by displacing
 * the vertices of an icosahedron with layered sine noise + a touch of
 * randomness, then re-normalizing so it stays smooth and glass-like
 * (no spikes) rather than a perfect sphere.
 *
 * @param {number} seed - deterministic seed, unique per pebble variant
 * @param {number} detail - icosahedron subdivision (1 or 2 is enough)
 * @param {number} noiseStrength - 0..1, how irregular the shape looks
 */
export function createPebbleGeometry(seed = 0, detail = 1, noiseStrength = 0.28) {
  const geometry = new THREE.IcosahedronGeometry(1, detail);
  const position = geometry.attributes.position;
  const vertex = new THREE.Vector3();
  const rand = mulberry32(seed);

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);

    const noise =
      Math.sin(vertex.x * 3.1 + seed) * 0.5 +
      Math.cos(vertex.y * 3.7 + seed * 2.1) * 0.5 +
      Math.sin(vertex.z * 2.6 + seed * 3.3) * 0.5;

    const jitter = (rand() - 0.5) * noiseStrength * 0.5;
    const offset = 1 + noise * noiseStrength * 0.35 + jitter;

    vertex.multiplyScalar(offset);
    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  return geometry;
}
