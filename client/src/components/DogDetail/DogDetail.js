import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDogDetail } from '../../actions/index';


const DogDetail = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogDetail(props.match.params.id));
    },[dispatch, props.match.params.id]);
    
    const detail = useSelector((state) => state.dogDetail);
    console.log(detail)

    return (
        <div>
            {detail.length > 0 ?
                <div>
                    <h1>{detail[0].name}</h1>
                    <img src={detail[0].image.url ? detail[0].image.url : detail[0].image} alt="" width="600px" height="380px"/>
                    <p>Temperaments: {!detail[0].createdInDb ? detail[0].temperament + ', ' : detail[0].temperaments.map(el => el.name + (' ')) }</p>
                    <p>Height: {detail[0].height.metric} cm</p>
                    <p>Weight: {detail[0].weight.metric} kg</p>
                    <p>Lifespan: {detail[0].life_span}</p>
                </div>    
        : <p>Loading...</p>}
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    )
}

export default DogDetail;
