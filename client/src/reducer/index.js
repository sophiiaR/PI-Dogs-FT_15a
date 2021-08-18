const initialState = {
    allDogs : [], 
    myDogs: [], 
    temperaments: [],
    dogDetail: [],
    page: 1
}

function getOneWeight(breed, method) {
    const key = method === "H-L" ? 1 : 0;
  
    if (breed.createdInDb) {
      return breed.weight.split("-").map((w) => w.trim())[key];
    } else {
      if (breed.weight.metric) {
        const weights = breed.weight.metric.split("-").map((w) => w.trim());
        if (weights.length > 1) {
          return weights[key];
        } else {
          return weights[0];
        }
      } else {
        return null;
      }
    }
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
        
        case 'FILTER_BY_TEMPERAMENT':
            const myDogs2 = state.myDogs;
            const tempFilter = myDogs2.filter(p => { 
                if(p.temperament !== undefined) {
                    return p.temperament?.includes(action.payload)
                }
                if(p.temperaments) {
                    let array1 = p.temperaments?.map(t => t.name);
                    return array1.includes(action.payload);
                }    
            })
            
            return {
                ...state,
                allDogs: tempFilter,
                page: 1 
            }

        case 'PAGE': 
            return {
                ...state,
                page: action.payload
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
        
        case 'ORDER_BY_WEIGHT':           
            const sortMethod = action.payload;
            
            const weightDogs = state.allDogs.sort(function (perroA, perroB) {
            const weightA = getOneWeight(perroA, sortMethod);
            const weightB = getOneWeight(perroB, sortMethod);
            
            const avalue = parseInt(weightA);
            const bvalue = parseInt(weightB);
            
            if (avalue < bvalue) {
                return sortMethod === "H-L" ? 1 : -1;
            }
            if (avalue > bvalue) {
                return sortMethod === "H-L" ? -1 : 1;
            }
            return 0;
            });
        return {
            ...state,
            allDogs: weightDogs
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