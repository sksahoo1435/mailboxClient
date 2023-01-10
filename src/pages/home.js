import { Outlet } from "react-router-dom";
import SideNav from "../components/Home/SideNav";
import NavBar from "../components/Home/Nav";
const Home = () => {
  return (
    <div
      className="home"
      style={{
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <NavBar />
      <main className="main-section">
        <section className="sidebar">
          <SideNav />
        </section>
        <section className="mailsList">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Home;
