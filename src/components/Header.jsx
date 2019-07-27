import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import { Menu, Dropdown, Icon } from "antd";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";
import { userIsOnMobile } from "../utils";

const menu = (
  <Menu className="mobile-dropdown-menu">
    <Menu.Item key="0">
      <NavLink to={"/reviews"} activeClassName="nav_active">
        Testimonials
      </NavLink>
    </Menu.Item>
    <Menu.Item key="1">
      <NavLink to={"/contact"} activeClassName="nav_active">
        Contact
      </NavLink>
    </Menu.Item>
    <Menu.Item key="3">
      <a
        href="https://www.facebook.com/drbiradar.shivshankar.3"
        target="_blank"
      >
        <img className="li-image" src={facebook} alt="facebook" />
      </a>
    </Menu.Item>
    <Menu.Item key="4">
      <img className="li-image" src={twitter} alt="twitter" />
    </Menu.Item>
    <Menu.Item key="5">
      <a
        href="https://instagram.com/ketkipiles?igshid=1mo2c6rhcl400"
        target="_blank"
      >
        <img className="li-image" src={instagram} alt="instagram" />
      </a>
    </Menu.Item>
  </Menu>
);

// console.log('user', userIsOnMobile());
const Header = () => (
  <header className="header">
    <NavLink to={"/"}>
      <img className="logo-image" src={logo} alt="logo" />
    </NavLink>
    <div className="nav">
      {userIsOnMobile() ? (
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link mobile-dropdown-link" href="#">
            <Icon type="align-right" />
          </a>
        </Dropdown>
      ) : (
        <ul className="nav-list">
          <li className="li-links">
            <NavLink to={"/reviews"} activeClassName="nav_active">
              Testimonials
            </NavLink>
          </li>
          <li className="li-links">
            <NavLink to={"/contact"} activeClassName="nav_active">
              Contact
            </NavLink>
          </li>
          <a
            href="https://www.facebook.com/drbiradar.shivshankar.3"
            target="_blank"
          >
            <li>
              <img className="li-image" src={facebook} alt="facebook" />
            </li>
          </a>
          <a href="#">
            <li>
              <img className="li-image" src={twitter} alt="twitter" />
            </li>
          </a>
          <a
            href="https://instagram.com/ketkipiles?igshid=1mo2c6rhcl400"
            target="_blank"
          >
            <li>
              <img className="li-image" src={instagram} alt="instagram" />
            </li>
          </a>
        </ul>
      )}
    </div>
  </header>
);

export default Header;
