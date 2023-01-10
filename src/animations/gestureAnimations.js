export const btnHoverAnimations = {
  boxShadow: "-1px 4px 51px -8px rgba(217,151,217,1)",
  scale: 1.05,
  transition: {
    boxShadow: {
      duration: 0.2,
      ease: "easeIn",
    },
    scale: {
      type: "spring",
      bounce: 0.8,
      delay: 0.2,
    },
  },
};
