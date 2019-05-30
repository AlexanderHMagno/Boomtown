// import {INCREMENT_COUNT, DECREMENT_COUNT, ADD_COUNTER} from './actions';

//ACTIONS
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_ITEM = 'RESETE_ITEM'


//ACTIONS CREATORS

export const updateNewItem = (item) => {
    console.log(item)
    return {
        type : UPDATE_ITEM,
        payload: item
    }
}

export const resteItem = () => {
    return {
        type : RESET_ITEM,
        payload: {}
    }
}

// STORE
export const INITIAL_STATE = {
    Image_url: '',
    name : 'Initial Name',
    description :'Initial description',
    tags: '',
    user_name : 'somebody',
    createdAt: '1 minute ago',
};



const reducer = (state = INITIAL_STATE , action ) => {
	switch ( action.type) {
		case (UPDATE_ITEM): {
            console.log(newState)
            const newState = action.payload;
			return { ...state, ...newState}
		}
		case (RESET_ITEM): {
			return {
				value: state.value - 1
			};
        }
		default:
			return state
	}
}

export default reducer; 