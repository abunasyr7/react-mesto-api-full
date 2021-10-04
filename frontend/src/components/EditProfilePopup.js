import React from 'react'
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {

    const [name,setName] = React.useState('');
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    function handleSetName (e) {
        setName(e.target.value)
    }

    function handleSetDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    return (
        <PopupWithForm
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            name = 'profile'
            title = 'Редактировать профиль'
            buttonText = "Сохранить"
            onSubmit = {handleSubmit}
        >
            <section className="form__section">
                <input type="text" name="name" className="form__input popup__input popup__input_type_name"
                       minLength="2" maxLength="40" placeholder="Имя" onChange={handleSetName}  value={name || ''}/>
                <span className="form__input-error"></span>
            </section>
            <section className="form__section">
                <input type="text" name="job" className="form__input popup__input popup__input_type_job"
                       minLength="2" maxLength="200" placeholder="Вид деятельности" onChange={handleSetDescription} value={description || ''} required/>
                <span className="form__input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditProfilePopup