import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';


function NavBar({ handleLogout, userAutentic }) {


    return (
        <nav>
            <ul>
                <li className='li__menu'>
                    <label htmlFor="menu" className='menu__label'>
                        <BiMenu className='icon_menu' />
                    </label>
                    <input type="checkbox" id='menu' />
                </li>
                <li>
                    <a href="/"><img src="https://cdn-icons-png.flaticon.com/512/7001/7001366.png" alt="" /></a>
                </li>
            </ul>
            <ul>
                {
                    !userAutentic?.data ? (
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                    ) : (
                        <li><Link to="/" onClick={handleLogout}>Cerrar Sesión ({userAutentic?.data?.rol})</Link></li>
                    )
                }
            </ul>
        </nav>
    );
}

export default NavBar;
