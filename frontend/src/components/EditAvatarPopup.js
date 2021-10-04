import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="avatar"
            title="Обновить аватар"
            buttonText = "Обновить аватар"
            onSubmit = {handleSubmit}
        >
            <section className="form__section">
                <input type="url" name="avatar" className="form__input popup__input popup__input_type_avatar"
                       placeholder="Ссылка на аватар" ref={avatarRef} required/>
                <span className="form__input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditAvatarPopup