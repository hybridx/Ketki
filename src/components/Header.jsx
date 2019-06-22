import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import instagram from '../assets/instagram.png';

const Header = ({}) => (
    <header>
            <Link to={'/'} ><img class="logo-image" src={logo} /></Link>
            <nav>
                <ul>
                    <li class="li-links"><Link to={'/reviews'} >Testimonials</Link></li>
                    <li className="li-links"><Link to={'/contact'} >Contact</Link></li>
                    <li><img class="li-image" src={facebook} /></li>
                    <li><img class="li-image" src={twitter} /></li>
                    <li><img class="li-image" src={instagram} /></li>
                </ul>
            </nav>
    </header>
)


export default Header;