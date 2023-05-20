import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpened(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpened(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpened(false);
    setAddPlacePopupOpened(false);
    setEditProfilePopupOpened(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          name="name"
          required
          placeholder="Имя"
          minLength={2}
          maxLength={40}
        />
        <span className="popup__error name-input-error">Вы пропустили это поле</span>
        <input
          className="popup__input popup__input_type_job"
          id="job-input"
          type="text"
          name="about"
          required
          placeholder="О себе"
          minLength={2}
          maxLength={200}
        />
        <span className="popup__error job-input-error">Вы пропустили это поле</span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_avatar-link"
          id="avatar-link-input"
          type="url"
          name="avatar"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error avatar-link-input-error">Вы пропустили это поле</span>
      </PopupWithForm>

      <PopupWithForm
        name="card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_card-title"
          id="card-title-input"
          type="text"
          name="name"
          required
          placeholder="Название"
          minLength={2}
          maxLength={30}
        />
        <span className="popup__error card-title-input-error">Вы пропустили это поле</span>
        <input
          className="popup__input popup__input_type_card-link"
          id="card-link-input"
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error card-link-input-error">Вы пропустили это поле</span>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
        />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
    </div>
  );
}

export default App;
