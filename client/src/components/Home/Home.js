import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs, filterCreated, orderDogsByName } from '../../actions/index';
import DogCard from '../DogCard/DogCard';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.allDogs);
    
    const [render, setRender] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(9);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); 

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getDogs);
    }

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value));
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderDogsByName(e.target.value));
        setCurrentPage(1);
        setRender(`Ordenado ${e.target.value}`);
    }

    return (
        <div>
            <div>
                <h1>Dogs' Info</h1>
                <Link to = '/create'>Create Breed</Link>
                <button onClick={(e) => handleClick(e)}>Volver a cargar todos los dogs</button>
            </div>
            <div>
                <select onChange={(e) => handleSort(e)}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select>
                    <option value="H-L">Heaviest to Lightest</option>
                    <option value="L-H">Lightest to Heaviest</option>
                </select>
                <select>
                    <option value="defaultValue">
                        Select temperaments
                    </option>
                </select>
                <select onChange={(e) => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Api">Api</option>
                </select>
                <SearchBar />
                <Paginate
                    dogsPerPage = {dogsPerPage}
                    dogs = {dogs.length}
                    paginate = {paginate}
                />
                {
                    currentDogs?.map(dog => {
                        return (
                            <Link to={'/home/' + dog.id}>
                                <DogCard 
                                    key={dog.id}
                                    name={dog.name} 
                                    image={dog.image.url ? dog.image.url : dog.image} 
                                    temperament={dog.temperament}
                                />
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Home;
