export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR"
export const TOGGLE_LOADING = "TOGGLE_LOADING"

export const OFFLINE = "OFFLINE"
export const ONLINE = "ONLINE"


export const useUIActions = dispatch => {
   return ({
      toggleNavbar: () => {
         dispatch({ type: TOGGLE_NAVBAR })
      },
      toggleLoading: () => {
         dispatch({ type: TOGGLE_LOADING })
      },
      offline: () => {
         dispatch({ type: OFFLINE })
      },
      online: () => {
         dispatch({ type: ONLINE })
      }
   })
}




