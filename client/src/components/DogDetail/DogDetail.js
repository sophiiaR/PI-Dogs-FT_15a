import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDogDetail } from '../../actions/index';
import style from './DogDetail.module.css';


const DogDetail = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);
    
    const detail = useSelector((state) => state.dogDetail);
    console.log(detail)

    return (
        <div className={style.dogstyle}>
            {detail.length > 0 ?
                <div className={style.content}>
                    <h1>{detail[0].name}</h1>
                    <img src={!detail[0].createdInDb ? detail[0].image.url : detail[0].image} alt=""/>
                    <p>Temperaments: {!detail[0].createdInDb ? detail[0].temperament + ', ' : detail[0].temperaments.map(el => el.name + (', '))}</p>
                    <p>Height: {!detail[0].createdInDb ? detail[0].height.metric : detail[0].height} cm</p>
                    <p>Weight: {!detail[0].createdInDb ? detail[0].weight.metric : detail[0].weight} kg</p>
                    <p>Lifespan: {!detail[0].createdInDb? detail[0].life_span : detail[0].life_span + (' years')}</p>
                </div>    
                : <p>Loading...</p>}
            <Link to='/home'>
                <button className={style.button}>Go Back</button>
            </Link>
        </div>
    )
}

export default DogDetail;
