import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const UIDropDown = (props) => {
  const [showItems, setShowItems] = useState(false);
  const menuControls = useAnimationControls();

  const dropdownVariants = {
    hidden: { opacity: 0 },
    visible: {
      y: [-100, 0],
      scale: [0.2, 1],
      transition: {
        scale: { duration: 0.25 },
        y: { duration: 0.35, type: "spring", stiffness: 450 },
      },
    },
    close: {
      opacity: 0,
      y: [0, -100],
      transition: {
        opacity: { duration: 1, type: "tween" },
        y: { duration: 1, type: "spring", stiffness: 450 },
      },
    },
  };
  useEffect(() => {
    showItems && menuControls.start("visible");
  }, [menuControls, showItems]);
  return (
    <div className="position-relative" style={{width: 400}}>
      <motion.button
        className="btn btn-lg btn-primary"
        onClick={() => {
          setShowItems((prev) => !prev);
        }}
      >
        <span className="me-2">Select items</span>
        {showItems ? <ChevronUp /> : <ChevronDown />}
      </motion.button>

      <AnimatePresence>
        {showItems && (
          <motion.ul
            key="dropdownList"
            variants={dropdownVariants}
            animate={menuControls}
            exit="close"
            style={{
              width: "110%",
              position: "absolute",
              left: "0",
              top: "120%",
            }}
            className="p-0"
          >
            {props.dropdownItems.map((item) => {
              return (
                <motion.button
                  whileHover={{
                    y: [null, 10, 0],
                    backgroundColor: "#3d1d7128",
                    transition: {
                      y: { duration: 0.2, delay: 0 },
                    },
                  }}
                  className="btn btn-altlight d-block text-start w-100 text-info my-2 rounded-pill"
                  onClick={() => {
                    setShowItems(false);
                  }}
                >
                  {item}
                </motion.button>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UIDropDown;
