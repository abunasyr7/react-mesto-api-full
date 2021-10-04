import React from 'react'

function FormSign ({ text, button}) {
    return (
        <div className = "login">
            <h2 className= "login__sign-in">{text}</h2>
            <form className = "login__form">
                <input required type="text" name = "username" placeholder = "Email"/>
                <input required type="password" name = "password" placeholder = "Пароль"/>
                <div className = "login__button-container">
                    <button className = "login__link">{button}</button>
                </div>
            </form>
        </div>
    )
}

export default FormSign