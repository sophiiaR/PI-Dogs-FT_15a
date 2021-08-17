import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

const Landing = () => {
    return (
        <div className={style.home}>
                <div className={style.content}>
                    <h1>Dogspedia</h1>
                    <p>The latest Dogs Pedia – Dog Breed Identifier</p>
                    <Link to = '/home'>
                        <button>Let's go</button>
                    </Link>
                </div>       
        </div>
    )
}

export default Landing;


