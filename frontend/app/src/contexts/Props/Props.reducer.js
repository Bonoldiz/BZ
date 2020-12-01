import { FETCH_PROPS, FETCH_PROPS_SUCCESS, FETCH_PROPS_ERROR } from "./Props.actions"

/**
 * the initial Props state
 */
export const initPropsState = {
   loading: false,
   props: null,
   links: null
}

/** 
 * The reducer that is used in the Props context
 * @see {@link https://it.reactjs.org/docs/hooks-reference.html#usereducer|React Reducer Hook} 
 */
export const propsReducer = (state, action) => {

   switch (action.type) {
      case FETCH_PROPS:
         return {
            ...state,
            ...{ loading: true }
         }
      case FETCH_PROPS_SUCCESS:
         return {
            ...state,
            ...{
               loading: false,
               props: action.payload.propertiesTree.props,
               links: action.payload.propertiesTree.links
            }
         }
      case FETCH_PROPS_ERROR:
         return {
            ...state,
            ...{
               loading: false,
               props: null,
               links: null
            }
         }
      default:
         return { ...state }
   }
}