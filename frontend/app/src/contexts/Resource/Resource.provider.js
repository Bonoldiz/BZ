import React from 'react'
import { ResourceReducer,initResourceState } from './Resource.reducer'
import { useResourceActions } from './Resource.actions';
import { ResourceContext } from './Resource.context';
import { debugDispatch } from '../../utils/debugDispatch';


/**
 * Provide the react context to access Resource methods and data
 */
export const ResourceProvider = ({children}) => {
    const [state,dispatch] = React.useReducer(ResourceReducer,initResourceState);

    const actions = useResourceActions(debugDispatch(dispatch),state)

    return(
        <ResourceContext.Provider value={{state,actions}} >
            {children}
        </ResourceContext.Provider>
    )

}