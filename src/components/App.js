import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    api
      .getStartData()
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpened(true);
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.setUserAvatarApi(userData)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {setIsLoading(false)});
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpened(true);
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {setIsLoading(false)});
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpened(true);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfoApi(userData)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {setIsLoading(false)});
  };

  function closeAllPopups() {
    setEditAvatarPopupOpened(false);
    setAddPlacePopupOpened(false);
    setEditProfilePopupOpened(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
