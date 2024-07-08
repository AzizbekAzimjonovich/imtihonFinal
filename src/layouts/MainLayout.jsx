//react-router-dom
import { Outlet } from "react-router-dom";

//components
import { Navbar } from "../components";

function MainLayout() {
  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
