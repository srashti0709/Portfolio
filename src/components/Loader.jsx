import { motion } from "framer-motion";
import "./Loader.css";

export default function Loader({ progress }) {
  const radius = 30;
  const stroke = 4;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
    >
      <div className="loader-wrapper">

        <svg
          className="loader-circle"
          width="70"
          height="70"
        >
          <circle
            className="circle-bg"
            cx="35"
            cy="35"
            r={normalizedRadius}
            strokeWidth={stroke}
          />

          <circle
            className="circle-progress"
            cx="35"
            cy="35"
            r={normalizedRadius}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="loader-percent">
          {progress}%
        </div>

      </div>

      <p className="loader-text">
        Loading...
      </p>

      
    </motion.div>
  );
}