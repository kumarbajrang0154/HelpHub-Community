import { motion } from "framer-motion";

const Workflow = ({ steps }) => {
  return (
    <section id="workflow" className="workflow-section">
      <div className="section-container">
        <div className="section-left">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Workflow</h2>
            <p>Simple steps to get started with our AI tools.</p>
          </motion.div>
        </div>

        <div className="section-right">
          <div className="workflow-track">
            <div className="workflow-line" />
            <div className="workflow-items">
              {steps?.map((step, index) => (
                <motion.div
                  key={index}
                  className="workflow-step"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="step-badge">{step.step}</div>
                  <div className="workflow-step-copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
