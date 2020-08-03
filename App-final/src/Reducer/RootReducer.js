import * as Actions from '../Constants/ActionTypes';
const initialState = {
    LoggedIn: false,
    UserName: ['','',''],
    reports: [],
    fromReport: false,
    email: "",
    token: "",
};

function rootReducer(state = initialState, action={}) {
    switch (action.type) {
        case Actions.SET_GLOBAL_STATE:
            return {
                ...state,
                ...action.payload
            };
        case Actions.FROM_REPORT:
            return{
                ...state,
                fromReport: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;