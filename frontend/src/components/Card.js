import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_active' : 'element__delete'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_type_active' : 'element__like'}`
    );

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return(
            <article className="element">
                <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
                <div className="element__name">
                    <h2 className="element__text">{props.card.name}</h2>
                    <div className="element__like-section">
                        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                        <p className="element__number">{props.card.likes.length}</p>
                    </div>
                </div>
                <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            </article>
    )
}

export default Card