import axios from "axios";
import Authenticate from "src/Authenticate";
import { GET_USER_INFO, storeUserInfo, TEST_LOADER, USER_DATA_LOADING, USER_DATA_SUCCESS } from "../actions/user";

const initialState = {
    data: {},
    loading: false,
    sampletext: ''
}

const defineUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DATA_LOADING:
            return {...state, loading:true}
        case USER_DATA_SUCCESS:
            return {...state, data: action.payload, loading: false}
        case TEST_LOADER:
            return {...state, sampletext: action.payload};
        default:
            return state
    }
}

export default defineUserReducer;