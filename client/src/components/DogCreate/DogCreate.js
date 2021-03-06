import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTemperaments, postDog } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import style from './DogCreate.module.css';

const validateDogData = (dogData) => {
    let errors = {};
    if(!dogData.name) {
        errors.name = 'You must enter a name';
    } 
    if(dogData.height && !/\d{1,2}-\d{1,2}/g.test(dogData.height)) {
        errors.height = 'You must enter a height in range. E.g: 10-35 cm';
    } else {
        errors.height = "";
    }
    if(dogData.weight && !/\d{1,2}-\d{1,2}/g.test(dogData.weight)) {
        errors.weight = 'You must enter a weight in range. E.g: 6-8 kg';
    } else {
        errors.weight = "";
    }
    if(dogData.life_span && !/\d{1,2}-\d{1,2}/g.test(dogData.life_span)) {
        errors.life_span = 'You must enter a lifespan in range. E.g: 5-10 years';
    } else {
        errors.life_span = "";
    } 
    return errors;
}

const DogCreate = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const history = useHistory();
    const [errors, setErrors] = useState({});
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
        setErrors(validateDogData({
            ...dogData,
            [e.target.name] : e.target.value
        }));
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

    // const handleDelete = (t) => {
    //     setDogData({
    //         ...dogData,
    //         temperament: dogData.temperament.filter(temp => temp !== t)
    //     });
    // }


    return (
        <div className={style.dogCreate}>
            <div className={style.content}>
            <Link to = '/home'><button className={style.homeButton}>Home</button></Link>
            <h1>Create your dog's breed</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={style.dogDetail}>
                    <div className={style.inputBox}>
                        <label className={style.detail}>Name:</label>
                        <input
                            type="text"
                            value={dogData.name}
                            name="name"
                            onChange={(e) => handleInputChange(e)}
                            required
                        /> 
                        <div className={style.error}>
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                        </div>
                    </div>
                </div>
                <div className={style.dogDetail}>
                    <div className={style.inputBox}>
                    <label className={style.detail}>Height:</label>
                    <input
                        type="text"
                        value={dogData.height}
                        name="height"
                        placeholder = "min-max in cm"
                        onChange={(e) => handleInputChange(e)}
                        required
                    /> 
                    <div className={style.error}>
                    {errors.height && (
                        <p>{errors.height}</p>
                    )}
                    </div>
                    </div>
                </div>
                <div className={style.dogDetail}>
                    <div className={style.inputBox}>
                    <label className={style.detail}>Weight:</label>
                    <input
                        type="text"
                        value={dogData.weight}
                        name="weight"
                        placeholder = "min-max in kg"
                        onChange={(e) => handleInputChange(e)}
                        required
                    /> 
                    <div className={style.error}>

                    {errors.weight && (
                        <p>{errors.weight}</p>
                    )}
                    </div>
                    </div>
                </div>
                <div className={style.dogDetail}>
                    <div className={style.inputBox}>
                    <label className={style.detail}>Lifespan:</label>
                    <input
                        type="text"
                        value={dogData.life_span}
                        name="life_span"
                        placeholder = "min-max in years"
                        onChange={(e) => handleInputChange(e)}
                        required
                    /> 
                    <div className={style.error}>
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}
                    </div>
                    </div>
                </div>
                <div className={style.dogDetail}>
                    <div className={style.inputBox}>
                    <label className={style.detail}>Image:</label>
                    <input
                        type="text"
                        value={dogData.image}
                        name="image"
                        placeholder = "image url"
                        onChange={(e) => handleInputChange(e)}
                    />
                    </div>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {temperaments.map((temp) => {
                        return(
                            <option value={temp.name} key={temp.id}>{temp.name}</option>    
                        )
                    })}
                </select>
                <ul><li>{dogData.temperament.map(t => t + ', ')}</li></ul>
                <button type="submit" className={style.createButton}>Create Dog</button>
            </form>
            {/* {dogData.temperament.map(t =>
                <div>
                    <p>{t}</p>
                    <button onClick={() => handleDelete(t)}>x</button>
                </div>
                )} */}
                </div>
        </div>
    )
}

export default DogCreate;
