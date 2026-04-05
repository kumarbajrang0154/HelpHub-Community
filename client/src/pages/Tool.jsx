import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const Tool = () => {
  const { serviceName } = useParams();

  const title = useMemo(() => {
    return serviceName
      ? serviceName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Service";
  }, [serviceName]);

  return (
    <section className="tool-page-shell">
      <div className="page-inner">
        <BackButton />

        <motion.div
          className="tool-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">Service Placeholder</span>
          <h1>{title}</h1>
          <p>
            This is a placeholder page for <strong>{title}</strong>. The actual tool interface will be added here once the service workflow is integrated.
          </p>
          <div className="tool-notice">
            <p>Navigate back to explore other AI services or proceed after login.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tool;
