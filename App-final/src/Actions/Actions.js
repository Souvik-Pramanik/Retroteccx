import * as Constants from '../Constants/ActionTypes';

export const setGlobalState=(userInfo)=>({
    type: Constants.SET_GLOBAL_STATE,
    payload:  {...userInfo}
})

export const setfromReport=(value)=>({
    type: Constants.FROM_REPORT,
    payload: value
})