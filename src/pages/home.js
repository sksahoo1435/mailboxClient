import { Outlet } from "react-router-dom";
import SideNav from "../components/Home/SideNav";
import NavBar from "../components/Home/Nav";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const Home = () => {
  const { showSideNav } = useSelector((state) => state.ui);
  console.log(showSideNav);
  return (
    <div
      className="home"
      style={{
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <NavBar />
      <main
        className="main-section"
        style={{
          height: "100%",
        }}
      >
        <AnimatePresence>
          {showSideNav && (
            <motion.section
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "90vh",
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{
                x: 0,
                opacity: 1,

                transition: {
                  x: {
                    type: "tween",
                    delay: 0.1,
                    duration: 0.25,
                    ease: "easeOut",
                  },
                  opacity: {
                    type: "tween",
                    delay: 0.2,
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                },
              }}
              exit={{
                x: "-100%",

                transition: {
                  x: {
                    type: "tween",
                    delay: 0.1,
                    duration: 0.25,
                    ease: "easeOut",
                  },
                },
              }}
              className="sidebar"
            >
              <SideNav />
            </motion.section>
          )}
        </AnimatePresence>
        <section className="mailsList">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Home;
