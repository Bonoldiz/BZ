/**
 * @category Utils
 * @param {method} dispatch - the dispatch method from React useReducer Hook 
 */
export const debugDispatch = dispatch => action => {
    if(process.env.NODE_ENV === "development"){
        console.group("%c DISPATCH - ACTION ",'background: #FFFFFF; color: #000000')
    
        /* Type section */
        console.group( "%c TYPE ",'background: #FFFFFF; color: #000000')

        console.log(action.type)

        console.groupEnd()

        /* Payload section */
        if(action.payload){
            console.groupCollapsed( "%c PAYLOAD ",'background: #FFFFFF; color: #000000')
    
            console.log(action.payload)
    
            console.groupEnd()
        }

        console.groupEnd()
    }

    return dispatch(action)
}