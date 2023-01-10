export const outerDivVariants = {
  hidden: { x: "-50vw" },
  visible: {
    x: "0",
    transition: {
      x: {
        type: "spring",
        bounce: 0.5,
        delay: 0.2,
        duration: 1,
      },
    },
  },
};

export const formVariants = {
  visible: {
    scale: [0.5, 1],
    opacity: [0, 1],
    transition: {
      scale: {
        duration: 0.25,
        type: "tween",
        ease: "anticipate",
      },
      opacity: {
        delay: 0,
        duration: 0.1,
        type: "tween",
        ease: "anticipate",
      },
    },
  },
};
export const formInputVariants = {
  error: {
    borderColor: "#e7127d",
    backgroundColor: "#0000",
    transition: {
      borderColor: {
        type: "tween",
        duration: 0.15,
      },
    },
  },
};

export const mainLogoVariants = {
  hidden: { opacity: 0, y: "-100vh" },
  initial: {
    opacity: [null, 0.5, 0.75, 1],
    x: 0,
    y: 0,
    rotate: [0, 0, 0, 360, 360],
    transition: {
      type: "tween",
      delay: 0.25,
      duration: 1,
    },
  },
  next: {
    y: [0, -50, -14],
    transition: {
      y: {
        type: "spring",
        stiffness: 150,
        duration: 0.25,
        repeat: 2,
        repeatType: "reverse",
      },
    },
  },
};

export const headingVariants = {
  hidden: { opacity: 0, y: "50vh" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0,
      duration: 0.25,
    },
  },
};

export const pageTransitionVariations = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.225,
    },
  },
};

export const modalVariants = {
  backdropHidden: { opacity: 0 },
  backdropVisible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.14,
    },
  },
  backdropExit: {
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 0.25,
    },
  },
  overlayHidden: {
    x: 0,
    y: "0",
    opacity: 0,
  },
  overlayVisble: {
    y: -120,
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.22,
    },
  },
  overlayExit: {
    opacity: 0,
  },
};

export const loaderVariants = {
  animationOne: {
    x: [-40, 40],
    y: [0, 30],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.75,
      },
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  },
  animationTwo: {
    x: [40, -40],
    y: [0, -30],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.75,
        // delay:0.2
      },
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.25,
        // delay:0.2,
        ease: "easeInOut",
      },
    },
  },
};

export const feildErrorVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.2,
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const animateSiteHero = async (logoControls, headingcontrols) => {
  await logoControls.start("hidden");
  await logoControls.start("initial");
  await headingcontrols.start("visible");
  await logoControls.start("next");
};

export const showFieldError = async (inpfieldErrorcontrols) => {
  console.log(`visible`);
  await inpfieldErrorcontrols.start("visible");
};
export const hideFieldError = async (inpfieldErrorcontrols) => {
  console.log(`exit`);
  await inpfieldErrorcontrols.start("exit");
};
