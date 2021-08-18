import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs, filterCreated, orderDogsByName, page, getTemperaments, filterByTemperament, orderDogsByWeight } from '../../actions/index';
import DogCard from '../DogCard/DogCard';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css';


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.allDogs);
    const pageN = useSelector((state) => state.page);
    const temperaments = useSelector((state) => state.temperaments);
    
    const [render, setRender] = useState('');
    const [dogsPerPage] = useState(9);
    const indexOfLastDog = pageN * dogsPerPage; 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;  
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); 

    const paginate = (pageNumber) => {
        dispatch(page(pageNumber));
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getDogs());
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value));
    }

    const handleFilterTemperament = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        dispatch(filterByTemperament(e.target.value));
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderDogsByName(e.target.value));
        setRender(`Ordenado ${e.target.value}`);
    }

    const handleSortWeight = (e) => {
        e.preventDefault();
        dispatch(orderDogsByWeight(e.target.value));
        setRender(`Ordenado ${e.target.value}`);
    }

    return (
        <div className={style.content}>
            <div className={style.content1}>
                <div>
                    <h1>Dogspedia</h1>
                    <div className={style.create}>
                    <button className={style.button1}><Link to = '/create'>Create Breed</Link></button>
                    </div>
                    <button onClick={(e) => handleClick(e)} className={style.button1}>Load dogs</button>
                </div>
                <div className={style.options}>
                    <div className={style.onerow}>
                        <label className={style.label}>Sort By </label>
                        <select onChange={(e) => handleSort(e)}>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                        <select onChange={(e) => handleSortWeight(e)}>
                            <option value="H-L">Heaviest to Lightest</option>
                            <option value="L-H">Lightest to Heaviest</option>
                        </select>
                    </div>
                    <div className={style.onerow}>
                        <label className={style.label}>Filter By </label>
                        <select onChange={(e) => handleFilterTemperament(e)}>
                            <option>
                                Select a Temperament
                            </option> 
                            {temperaments && temperaments.map(
                                t => <option value={t.name} key={t.id}>{t.name}</option>
                                )}
                        </select>
                        <select onChange={(e) => handleFilterCreated(e)}>
                            <option value="All">All</option>
                            <option value="Created">Created</option>
                            <option value="Api">Api</option>
                        </select>
                    </div>
                </div>
                <SearchBar />
                <Paginate
                    dogsPerPage = {dogsPerPage}
                    dogs = {dogs.length}
                    paginate = {paginate}
                />
                <div className={style.cards}>
                {
                    currentDogs?.map(dog => {
                        return (
                            <Fragment>
                                <Link to={'/detail/' + dog.id}>
                                    <DogCard 
                                        key={dog.id}
                                        name={dog.name} 
                                        image={dog.createdInDb ? dog.image : dog.image.url}
                                        temperament = {dog.temperaments ? dog.temperaments.map(el => el.name + (', ')) : dog.temperament}                                    />
                                </Link>
                            </Fragment>
                        );
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Home;
