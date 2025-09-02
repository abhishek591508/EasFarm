import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
        method: "POST",
        credentials: "include", // important if your backend uses cookies
      });

      const data = await resp.json();
      if (data.success) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setIsLoggedIn(false);
        navigate("/login")
        alert(data.message || "Logout failed on server!");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong while logging out.");
    }
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={() => navigate("/")}>
        🌱 EasFarm
      </div>

      <nav className="header__nav">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./Header.css";

// export default function Header() {
//   const { isLoggedIn, setIsLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <header className="header">
//       <div className="header__logo" onClick={() => navigate("/")}>
//         🌱 EasFarm
//       </div>

//       <nav className="header__nav">
//         <Link to="/">Home</Link>
//         <Link to="/about">About Us</Link>
//         <Link to="/contact">Contact</Link>
//         {isLoggedIn ? (
//   <button onClick={setIsLoggedIn(false)} className="logout-btn">;
//     Logout
//   </button>
// ) : (
//   <Link to="/login" className="login-btn">
//     Login
//   </Link>
// )}

//       </nav>
//     </header>
//   );
// }
