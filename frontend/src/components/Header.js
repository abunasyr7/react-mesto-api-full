import React from 'react';
import logo from "../images/logo.svg";
import { Link, useLocation } from 'react-router-dom';

function Header (props) {

    const location = useLocation();


    return (
        <header className="header">
            <a href="/#" target="_blank" rel="noopener">
                <img src={logo} alt="Логотип" className="header__logo"/>
            </a>
            {props.loggedIn ? (
                <div className = "header__section">
                    <p className = "header__email">{props.userEmail}</p>
                    <Link to = '/sign-in' className = "header__text" onClick={props.onSignOut}>Выйти</Link>
                </div>
            ) : (
                <Link className = "header__text" to = {`${location.pathname === '/sign-in' ? '/sign-up': '/sign-in'}`}>
                    {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
                </Link>
            )}

        </header>

    )
}

export default Header;

