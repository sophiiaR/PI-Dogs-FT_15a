import axios from 'axios';

export function getDogs() {
    return async function(dispatch) {
        try {
            const dogs = await axios.get('http://localhost:3001/dogs');
            return dispatch({ 
                type: 'GET_ALL_DOGS', 
                payload: dogs.data 
            });
        } catch (error) {
            console.log(error)
        }
    }
}
export function filterCreated(payload) {
    console.log(payload)
    return ({
        type: 'FILTER_CREATED',
        payload
    })
}

export function orderDogsByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function getDogsByName(payload) {
    return async function(dispatch) {
        try {
            const dogsByName = await axios.get('http://localhost:3001/dogs?name=' + payload);
            return dispatch ({
                type: 'GET_DOGS_BY_NAME',
                payload: dogsByName.data //lo que devuelve la ruta /dogs luego de haber buscado por el query name
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        try {
            const temp = await axios.get('http://localhost:3001/temperament');
            return dispatch ({
                type: 'GET_TEMPERAMENTS',
                payload: temp.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog(payload) {
    return async function(dispatch) {
        const dogData = await axios.post('http://localhost:3001/dog', payload);
        console.log(dogData)
        return dogData;
    }
}

export function getDogDetail(id) {
    return async function(dispatch) {
        try {
            const dogDet = await axios.get('http://localhost:3001/dogs/' + id);
            console.log(dogDet)
            return dispatch({
                type: 'GET_DOG_DETAIL',
                payload: dogDet.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


