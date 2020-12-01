import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, REFRESH_TOKEN, LOGOUT, LOGOUT_SUCCESS, REFRESH_TOKEN_SUCCESS, LOGOUT_ERROR, REFRESH_TOKEN_ERROR } from "./Auth.actions";

/**
 * the initial Auth state
 */
export const initAuthState = {
    loading: false,
    loggedIn: false,
    user: {},
    token: null
}

/** 
 * The reducer that is used in the Auth context
 * @see {@link https://it.reactjs.org/docs/hooks-reference.html#usereducer|React Reducer Hook} 
 */
export const authReducer = (state, action) => {

    switch (action.type) {
        case LOGIN:
        case LOGOUT:
        case REFRESH_TOKEN:
            return {
                ...state,
                ...{ loading: true }
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...{
                    loading: false,
                    loggedIn: true,
                    user: action.payload.user,
                    token: action.payload.token
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                ...{
                    loading: false,
                    loggedIn: false,
                    user: {},
                    token: null
                }
            }
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                ...{
                    loading: false,
                    loggedIn: true,
                    token: action.payload.token
                }
            }

        case LOGIN_ERROR:
        case LOGOUT_ERROR:
        case REFRESH_TOKEN_ERROR:
            return {
                ...state,
                ...{
                    loading: false,
                    loggedIn: false,
                    user: {},
                    token: null
                }
            }
        default:
            return { ...state }
    }
}