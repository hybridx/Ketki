import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo1.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import instagram from '../assets/instagram.png';

const Header = ({}) => (
    <header class="header">
            <NavLink to={'/'} ><img class="logo-image" src={logo} /></NavLink>
            <nav class="nav">
                <ul class="nav-list">
                    <li class="li-links"><NavLink to={'/reviews'} activeClassName="nav_active">Testimonials</NavLink></li>
                    <li className="li-links"><NavLink to={'/contact'} activeClassName="nav_active">Contact</NavLink></li>
                    <li><img class="li-image" src={facebook} /></li>
                    <li><img class="li-image" src={twitter} /></li>
                    <li><img class="li-image" src={instagram} /></li>
                </ul>
            </nav>
    </header>
)


export default Header;