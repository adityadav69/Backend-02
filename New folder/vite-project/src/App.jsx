import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logoup1.png" alt="Logo" width={"100px"} />
          <span>School Innovation Marathon</span>
        </div>
        <ul className="nav-links">
          <li>About Us</li>
          <li>Road Map</li>
          <li>Themes</li>
          <li>Prizes</li>
          <li>Impact</li>
          <li>Partners</li>
          <li>Testimonial</li>
          <li>FAQs</li>
        </ul>
        <select className="language">
          <option>English</option>
          <option>Hindi</option>
        </select>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="text-content">
          <h1>School Innovation Marathon 2024</h1>
          <p>
            Creating Change Makers of tomorrow with 21st Century Skills. Nurture
            a culture of social innovation and build skills while inspiring
            young people to become transformative leaders.
          </p>
          <p className="note">
            The applications for SIM 2024 are now closed. <br />
            The results will be announced soon.
          </p>
          <button>Login</button>
        </div>

        <div className="image-content">
          <img
            className="trophy"
            src="https://via.placeholder.com/80"
            alt="Trophy"
          />
          <img
            className="certificate"
            src="https://via.placeholder.com/80"
            alt="Certificate"
          />
          <img
            className="boy"
            src="https://via.placeholder.com/150"
            alt="Boy"
          />
          <img
            className="girl"
            src="https://via.placeholder.com/150"
            alt="Girl"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
