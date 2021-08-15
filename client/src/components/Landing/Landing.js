import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1>Welcome to Dog's Blog</h1>
            <h2>The world just got better for Dog Lovers! The latest Dogs Pedia – Dog Breed Identifier is the perfect page for anyone who just can’t resist these four-legged angels.
            From breed identification to breed selection, this Dog Identifier app is your very own mini-encyclopedia about everything related to dogs.</h2>
            <Link to = '/home'>
                <button>Let's go</button>
            </Link>
        </div>
    )
}

export default Landing;
