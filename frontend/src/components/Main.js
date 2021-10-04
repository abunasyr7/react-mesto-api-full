import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupDelete from "./PopupDelete"

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info-section">
                    <div className="profile__avatar" onClick={props.onEditAvatar}>
                        <img src={currentUser.avatar} alt="Avatar" className="avatar" />
                        <div className="middle">
                            <div className="profile__image"></div>
                        </div>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <p className="profile__info-text">{currentUser.about}</p>
                    </div>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <div className="elements">
                {
                    props.cards.map((card => (
                    <Card
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        key={card._id}
                        card={card}
                    />
                )))
                }
            </div>
            <PopupDelete />
        </main>
    )
}

export default Main;