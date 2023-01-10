import React from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

import { feildErrorVariants } from "../../animations/framerAnimations";
import useClearResError from "../../hooks/useClearResError";
const UIAlert = ({ message, className }) => {
  const inpfieldErrorcontrols = useAnimationControls();
  useClearResError(message, inpfieldErrorcontrols);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="fieldError"
          variants={feildErrorVariants}
          initial="hidden"
          animate={inpfieldErrorcontrols}
          exit="exit"
          className="bg-danger m-0 p-0 pos-fixed top"
        >
          <p className={`text-light p-3 fw-bold m-0 ${className}`}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UIAlert;
