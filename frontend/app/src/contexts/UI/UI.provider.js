import React from 'react'
import { UIReducer,initUIState } from './UI.reducer'
import { useUIActions } from './UI.actions';
import { UIContext } from './UI.context';
import { debugDispatch } from '../../utils/debugDispatch';


/**
 * Provide the react context to access UI methods and data
 */
export const UIProvider = ({children}) => {
    const [state,dispatch] = React.useReducer(UIReducer,initUIState);

    const actions = useUIActions(debugDispatch(dispatch))

    return(
        <UIContext.Provider value={{UIState:state,UIActions:actions}} >
            {children}
        </UIContext.Provider>
    )

}