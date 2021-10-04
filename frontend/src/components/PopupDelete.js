import React from 'react'

function PopupDelete() {
    return (
        <div className="popup popup-delete">
            <div className="popup__body">
                <div className="popup__content popup-delete__content">
                    <button className="popup__close close-popup" type="button"></button>
                    <h2 className="popup__title">Вы уверены?</h2>
                    <button className="popup__save" type="submit" value="Reset">Да</button>
                </div>
            </div>
        </div>
    )
}

export default PopupDelete