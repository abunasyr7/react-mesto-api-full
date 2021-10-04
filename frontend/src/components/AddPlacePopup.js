import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {

    const [name,setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function addName(e) {
        setName(e.target.value)
    }

    function addLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        })
    }

    React.useEffect(() => {
        setName('');
        setLink('')
    }, [props.isOpen])

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name='place'
            title = 'Новое место'
            buttonText = "Сохранить"
            onSubmit = {handleSubmit}
        >
            <section className="form__section">
                <input type="text" name="place" className="form__input popup__input popup__input_type_place"
                       placeholder="Название" minLength="2" maxLength="30" required value={name || ''} onChange={addName}/>
                <span className="form__input-error"></span>
            </section>
            <section className="form__section">
                <input type="url" name="image" className="form__input popup__input popup__input_type_image"
                       placeholder="Ссылка на картинку" required value={link || ''} onChange={addLink}/>
                <span className="form__input-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default AddPlacePopup;