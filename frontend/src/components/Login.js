import React from "react";

function Login ({onLogin}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        onLogin(email,password)
    }

    return (
        <>

            <div className = "login">
                <h2 className= "login__sign-in">Вход</h2>
                <form className = "login__form" onSubmit={handleSubmit}>
                    <input required type="text" name = "email" placeholder = "Email" value={email} onChange={changeEmail}/>
                    <input required type="password" name = "password" placeholder = "Пароль" value={password} onChange={changePassword}/>
                    <div className = "login__button-container">
                        <button className = "login__link" type="submit">Войти</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login