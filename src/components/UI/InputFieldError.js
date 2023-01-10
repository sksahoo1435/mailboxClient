import React, { useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { feildErrorVariants } from "../../animations/framerAnimations";

const InputFieldError = ({ isInvalid, errorMsg }) => {
  const inpfieldErrorcontrols = useAnimationControls();

  useEffect(() => {
    isInvalid && errorMsg.length > 0 && inpfieldErrorcontrols.start("visible");
  }, [errorMsg, inpfieldErrorcontrols, isInvalid]);

  return (
    <AnimatePresence>
      {isInvalid ? (
        <motion.div
          key="fieldError"
          variants={feildErrorVariants}
          initial="hidden"
          animate={inpfieldErrorcontrols}
          exit="exit"
          className="text-danger m-0 pb-2"
        >
          {errorMsg}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default InputFieldError;
