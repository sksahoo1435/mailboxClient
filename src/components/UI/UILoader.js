import React from "react";
import { motion } from "framer-motion";
import { loaderVariants } from "../../animations/framerAnimations";
const UILoader = () => {
  return (
    <div className="loader-container">
      <motion.div
        variants={loaderVariants}
        animate="animationOne"
        className="loader bg-danger"
      ></motion.div>
      <motion.div
        variants={loaderVariants}
        animate="animationTwo"
        className="loader bg-primary"
      ></motion.div>
    </div>
  );
};

export default UILoader;
