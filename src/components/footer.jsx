import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import Icon from "./icons.jsx";
import { PROPERTY } from "../../data.js";
import { useApp } from "../../AppProvider.jsx";

function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">
              <img
                src="icon.png"
                alt="Stayinn logo"
                className="brand-logo"
                width="34"
                height="34"
              />
              {" "}Stayinn
            </div>

            <p className="about">
              A boutique stay with modern comfort and warm hospitality.
              Thoughtful rooms, honest prices and a team that cares.
            </p>
          </div>

          <div>
            <h4>Explore</h4>

            <div className="footer-links">
              <a href="#/">Home</a>
              <a href="#/rooms">All rooms</a>
              <a href="#/rooms?type=Suite">Suites</a>
              <a href="#/rooms?type=Deluxe">Deluxe rooms</a>
            </div>
          </div>

          <div>
            <h4>Good to know</h4>

            <div className="footer-links">
              <a
                href="#/rooms"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/rooms");
                }}
              >
                Check-in 15:00
              </a>

              <a
                href="#/rooms"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/rooms");
                }}
              >
                Check-out 11:00
              </a>

              <a
                href="#/rooms"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/rooms");
                }}
              >
                Free cancellation
              </a>

              <a
                href="#/rooms"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/rooms");
                }}
              >
                Best price guarantee
              </a>
            </div>
          </div>

          <div>
            <h4>Contact</h4>

            <ul className="footer-contact">
              <li>
                <Icon name="mapPin" /> {PROPERTY.location}
              </li>

              <li>
                <Icon name="phone" /> {PROPERTY.contact.phone}
              </li>

              <li>
                <Icon name="mail" /> {PROPERTY.contact.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex justify-between flex-wrap gap-3">
          <span>
            © {new Date().getFullYear()} Stayinn Hotel & Suites. All rights
            reserved.
          </span>

          <span>Made for a restful stay.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
