import React from 'react'
import { authReducer, initAuthState } from './Auth.reducer'
import { useAuthActions } from './Auth.actions';
import { AuthContext } from './Auth.context';
import { debugDispatch } from '../../utils/debugDispatch';

/**
 * Provide the react context to access Auth methods and data
 */
export const AuthProvider = ({children}) => {
    const [state,dispatch] = React.useReducer(authReducer,initAuthState);

    const actions = useAuthActions(debugDispatch(dispatch))

    return(
        <AuthContext.Provider value={{authState:state,authActions:actions}} >
            {children}
        </AuthContext.Provider>
    )
}