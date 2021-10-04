import React from 'react';

function PopupWithForm (props) {

    return (
        <>
            {/*Общая форма попапа*/}
            <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_open' : ''}`}>
                <div className={"popup__body"}>
                    <div className={`popup__content popup-${props.name}__content`}>
                        <button className="popup__close close-popup" type="button" onClick={props.onClose}></button>
                        <h2 className="popup__title">{props.title}</h2>
                        <form name={props.name} className="form popup__form" onSubmit={props.onSubmit}>
                            {props.children}
                            <button className="popup__save" type="submit" value="Reset">{props.buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>

            {/*Попап удаления карточки*/}

        </>
    )
}


export default PopupWithForm;