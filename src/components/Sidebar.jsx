import { NavLink } from "react-router-dom";

const links = [
  { to: "/",         label: "Dashboard" },
  { to: "/habits",   label: "Habits"    },
  { to: "/insights", label: "Insights"  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">HabitFlow</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;