import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo1.jpg';
import { Menu, Dropdown, Icon } from 'antd';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import instagram from '../assets/instagram.svg';
import { userIsOnMobile }from '../utils';

const menu = (
    <Menu className="mobile-dropdown-menu">
    <Menu.Item key="0">
    <NavLink to={'/reviews'} activeClassName="nav_active">Testimonials</NavLink>
    </Menu.Item>
    <Menu.Item key="1">
     <NavLink to={'/contact'} activeClassName="nav_active">Contact</NavLink>
    </Menu.Item>
    <Menu.Item key="3">
    <img className="li-image" src={facebook} alt="facebook"/>
    </Menu.Item>    
    <Menu.Item key="4">
        <img className="li-image" src={twitter} alt="twitter"/>
    </Menu.Item>
    <Menu.Item key="5">
    <img className="li-image" src={instagram} alt="instagram"/>
    </Menu.Item>
  </Menu>
);

console.log('user', userIsOnMobile());
const Header = () => (
    <header className="header">
            <NavLink to={'/'} ><img className="logo-image" src={logo} alt="logo"/></NavLink>
            <div className="nav">
                {userIsOnMobile() ? 
                 <Dropdown overlay={menu} trigger={['click']}>
                 <a className="ant-dropdown-link mobile-dropdown-link" href="#">
                   Menu <Icon type="down" />
                 </a>
               </Dropdown>   :    
                <ul className="nav-list">
                    <li className="li-links"><NavLink to={'/reviews'} activeClassName="nav_active">Testimonials</NavLink></li>
                    <li className="li-links"><NavLink to={'/contact'} activeClassName="nav_active">Contact</NavLink></li>
                    <li><img className="li-image" src={facebook} alt="facebook"/></li>
                    <li><img className="li-image" src={twitter} alt="twitter"/></li>
                    <li><img className="li-image" src={instagram} alt="instagram"/></li>
                </ul>
                    }
            </div>
    </header>
)


export default Header;