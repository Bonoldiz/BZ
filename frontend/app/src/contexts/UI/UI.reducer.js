import { TOGGLE_NAVBAR, TOGGLE_LOADING, OFFLINE, ONLINE } from "./UI.actions"

/**
 * the initial UI state
 */
export const initUIState = {
   navbar: {
      show: true
   },
   loading: false,
   net: 'online'
}

/** 
 * The reducer that is used in the UI context
 * @see {@link https://it.reactjs.org/docs/hooks-reference.html#usereducer|React Reducer Hook} 
 */
export const UIReducer = (state, action) => {
   switch (action.type) {
      case TOGGLE_NAVBAR:
         return {
            ...state,
            ...{ navbar: { show: !state.navbar.show } }
         }
      case TOGGLE_LOADING:
         return {
            ...state,
            ...{ loading: !state.loading }
         }
      case OFFLINE:
         return {
            ...state,
            ...{ net: 'offline' }
         }
      case ONLINE:
            return {
               ...state,
               ...{ net: 'online' }
            }
      default:
         return { ...state }
   }
}