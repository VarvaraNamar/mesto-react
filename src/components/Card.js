import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div id="card-template">
      <article className="element">
        <img
          className="element__image"
          src={props.card ? props.card.link : '#'}
          alt={props.card ? props.card.name : ''}
          onClick={handleClick}
        />
        <button className="element__delete-button" aria-label="Удалить карточку" type="button" />
        <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button className="element__like-button" aria-label="Поставить лайк" type="button" />
            <span className="element__like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Card;
