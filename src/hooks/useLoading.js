import { useEffect, useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEverything() {
      // Wait until fonts are loaded
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Wait until page finishes loading
      if (document.readyState !== "complete") {
        await new Promise((resolve) => {
          window.addEventListener("load", resolve, { once: true });
        });
      }

      setLoading(false);
    }

    loadEverything();
  }, []);

  return loading;
}