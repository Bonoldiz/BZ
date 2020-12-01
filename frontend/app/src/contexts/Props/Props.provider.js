import React from 'react'
import { initPropsState,propsReducer } from './Props.reducer'
import { usePropsActions } from './Props.actions';
import { PropsContext } from './Props.context';
import { debugDispatch } from '../../utils/debugDispatch';

/**
 * Provide the react context to access Props methods and data
 */
export const PropsProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(propsReducer, initPropsState);

   const actions = usePropsActions(debugDispatch(dispatch),state)

   return (
      <PropsContext.Provider value={{ propsState: state, propsActions: actions }} >
         {children}
      </PropsContext.Provider>
   )
}