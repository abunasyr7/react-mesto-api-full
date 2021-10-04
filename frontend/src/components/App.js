import React from 'react';
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import MyProfile from "./MyProfile";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('')
  const history = useHistory();

  function handleInfoTooltipPopupOpen() {
      setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen)
      console.log(isInfoTooltipPopupOpen)
  }

  function closeInfoTooltip() {
      setIsInfoTooltipPopupOpen(false)
  }



    function register(email, password) {
        auth.register(email, password).then(
            () => {
                setIsSuccess(true)
                handleInfoTooltipPopupOpen()
                history.push('/');
            })
            .catch((err) => {
                console.log('register error', err)
                setIsSuccess(false)
                handleInfoTooltipPopupOpen()
            })
    }

    function login(email, password) {
        auth.authorization(email, password).then(
            (data) => {
                localStorage.setItem('token', data.token);
                setUserEmail(email)
                setLoggedIn(true)
                history.push("/my-profile");
            })
            .catch((err) => {
                console.log(err)
            })
    }


    function signOut() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        history.push('/sign-in');
    }

    const checkToken = React.useCallback(() => {
        const token = localStorage.getItem('token');
        auth.checkToken(token).then(
            (data) => {
                setLoggedIn(true);
                setUserEmail(data.data.email);
                history.push('/')
            }
        )
            .catch((err) => {
                console.log(err);
            })
    }, [history])

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkToken();
        }
    }, [checkToken]);

  return (
        <div className="page">
            <Header loggedIn={loggedIn} userEmail = {userEmail} onSignOut={signOut}/>
            <Switch>
                <Route exact path = "/">
                    {loggedIn ? <Redirect to = "/my-profile" /> : <Redirect to = "/sign-in" />}
                </Route>
                <ProtectedRoute
                    path = "/my-profile"
                    loggedIn = {loggedIn}
                    component = {MyProfile}
                />
                <Route path = "/sign-in">
                    <Login onLogin={login} onCheckToken={checkToken} />
                </Route>
                <Route path = "/sign-up">
                    <Register onRegister={register} />
                </Route>
            </Switch>
            <InfoTooltip isOpen={isInfoTooltipPopupOpen}
                         onClose={closeInfoTooltip} isSuccess={isSuccess}/>
        </div>
  );
}

export default App;
