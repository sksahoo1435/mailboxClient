import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "../../animations/framerAnimations";
const UIAnimatedModal = ({ showModal, modalBody, style }) => {
  return createPortal(
    <AnimatePresence>
      {showModal && (
        <motion.div
          key="modal-back"
          className="modalBackdrop d-flex align-items-center justify-content-center"
          variants={modalVariants}
          initial="backdropHidden"
          animate="backdropVisible"
          exit="backdropExit"
        >
          <motion.div
            style={style && style}
            className="modalBody bg-white rounded shadow  mt-5 "
            variants={modalVariants}
            initial="overlayHidden"
            animate="overlayVisble"
            exit="overlayExit"
          >
            {modalBody}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
};

export default UIAnimatedModal;
