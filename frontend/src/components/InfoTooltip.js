import React from "react";
import fail from '../images/Fail.svg';
import success from '../images/Success.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_reg ${props.isOpen ? 'popup_open' : ''}`}>
            <div className={"popup__body"}>
                <div name={props.name} className="popup__content">
                    <div className='popup__form popup__form_tooltip'>
                        <button type="button" className="popup__close close-popup" onClick={props.onClose}></button>
                        <img className='popup__image'
                             src={props.isSuccess ? success : fail}
                             alt={props.isSuccess ? 'Регистрация выполнена' : 'Регистрация отклонена'}/>
                        <h2 className="popup__title popup__title-tooltip">
                            {props.isSuccess ? 'Вы успешно Зарегистрировались':'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default InfoTooltip;