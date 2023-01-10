import { motion, useAnimationControls } from "framer-motion";
import "../../assets/css/loginHeader.css";
import {
  mainLogoVariants,
  headingVariants,
  animateSiteHero,
} from "../../animations/framerAnimations";
const SiteHero = () => {
  const logoControls = useAnimationControls();
  const headingcontrols = useAnimationControls();

  animateSiteHero(logoControls, headingcontrols);

  return (
    <div className="logo-container">
      <div className="logo-inner-container mx-auto">
        <motion.div
          className="logo"
          variants={mainLogoVariants}
          animate={logoControls}
        >
          <img
            className="d-block mx-auto"
            src="/assets/hero.svg"
            alt="hero"
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate={headingcontrols}
          className="site-header"
        >
          MAILBOX CLIENT
        </motion.h1>
      </div>
    </div>
  );
};

export default SiteHero;
