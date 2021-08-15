import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTemperaments, postDog } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';



const DogCreate = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const history = useHistory();

    const [dogData, setDogData] = useState({
        name: '',
		height: '',
		weight: '',
		life_span: '',
		image: '',
		temperament: [] 
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleInputChange = (e) => {
        setDogData({
            ...dogData,
            [e.target.name] : e.target.value
        })
        console.log(dogData)
    }

    const handleSelect = (e) => {
        setDogData({
            ...dogData,
            temperament: [...dogData.temperament, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dogData)
        dispatch(postDog(dogData));
        alert('Dog created successfully!');
        setDogData({
            name: '',
		    height: '',
		    weight: '',
		    life_span: '',
		    image: '',
		    temperament: [] 
        });
        history.push('/home');
    }


    return (
        <div>
            <Link to = '/home'><button>Home</button></Link>
            <h1>Create your breed</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={dogData.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type="text"
                        value={dogData.height}
                        name="height"
                        placeholder = "min-max in cm"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="text"
                        value={dogData.weight}
                        name="weight"
                        placeholder = "min-max in kg"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Lifespan:</label>
                    <input
                        type="text"
                        value={dogData.life_span}
                        name="life_span"
                        placeholder = "in years"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        value={dogData.image}
                        name="image"
                        placeholder = "image url"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((temp) => {
                        return(
                            <option value={temp.name} key={temp.id}>{temp.name}</option>    
                        )
                    })}
                </select>
                <ul><li>{dogData.temperament.map(t => t + ', ')}</li></ul>
                <button type="submit">Create Dog</button>
                
            </form>
        </div>
    )
}

export default DogCreate;
