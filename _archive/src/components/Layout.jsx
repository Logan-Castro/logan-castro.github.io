import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";

export default function Layout() {
  return (
    <div className="app-shell" id="top">
      <Nav />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
