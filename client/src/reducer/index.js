const initialState = {
    allDogs : [], 
    myDogs: [], 
    temperaments: [],
    dogDetail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                allDogs: action.payload,
                myDogs: action.payload
            }

        case 'FILTER_CREATED':
            const allDogs2 = state.myDogs;
            const createdFilter = action.payload === 'Created' ? allDogs2.filter(dog => dog.createdInDb) : allDogs2.filter(dog => !dog.createdInDb)
        return {
            ...state,
            allDogs: action.payload === 'All' ? allDogs2 : createdFilter
            }

        case 'ORDER_BY_NAME':
            let sortedDogs = action.payload === 'A-Z' ?
            state.allDogs.sort(function (a,b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.allDogs.sort(function (a,b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                allDogs: sortedDogs
            }

        case 'GET_DOGS_BY_NAME':
            return {
                ...state,
                allDogs: action.payload
            }
        
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        
        case 'POST_DOG':
            return {
                ...state
            }
        
        case 'GET_DOG_DETAIL':
            return {
                ...state,
                dogDetail: action.payload
            }
    
        default: return state;
    }
}

export default rootReducer;