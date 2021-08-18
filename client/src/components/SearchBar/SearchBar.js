import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../../actions/index';
import style from './SearchBar.module.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDogsByName(name));
        setName('');
    }
    
    return (
        <div className={style.content}>
            <input
                type = "text"
                placeholder = "Search..."
                onChange = {(e) => handleInputChange(e)}
            />
            <button type = "submit" onClick = {(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;
