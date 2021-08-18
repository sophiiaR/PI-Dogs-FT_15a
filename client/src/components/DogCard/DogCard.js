import React from 'react';
import style from './DogCard.module.css';

const DogCard = ({ name, image, temperament }) => {
    return (
        <div className={style.content}>
            <p className={style.title}>{name}</p>
            <img src={image} alt="dogimg" width="200px" height="200px"/>
            <p>{temperament}</p>
        </div>
    )
}

export default DogCard;

