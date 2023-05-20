import React from 'react';
import api from '../utils/Api';
import Card from './Card'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getStartData()
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__container">
          <button
            onClick={onEditAvatar}
            className="profile__avatar-edit-button"
            aria-label="Редактировать аватар"
            type="button"
          >
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${userAvatar})` }}
            ></div>
          </button>
          <div className="profile__info">
            <div className="profile__edit-bio">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                aria-label="Редактировать профиль"
                type="button"
              />
            </div>
            <p className="profile__caption">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          aria-label="Добавить фотографии"
          type="button"
        />
      </section>
      <section className="elements">
      {cards.map((card) => (
          <Card
            id={card._id}
            card={card}
            title={card.name}
            likes={card.likes.length}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
