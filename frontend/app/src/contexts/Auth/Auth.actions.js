import React from 'react'
import { UIContext } from "../UI/UI.context"

import notie from 'notie'

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const LOGOUT = "LOGOUT"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_ERROR = "LOGOUT_ERROR"

export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS"
export const REFRESH_TOKEN_ERROR = "REFRESH_TOKEN_ERROR"

export const REFRESH_USER = "REFRESH_USER"
export const REFRESH_USER_SUCCESS = "REFRESH_USER_SUCCESS"
export const REFRESH_USER_ERROR = "REFRESH_USER_ERROR"

/**
 * Auth actions and utilities
 * 
 * @param {method} dispatch - the dispach method to use
 */
export const useAuthActions = dispatch => {
   const { UIState, UIActions } = React.useContext(UIContext);

   return ({
      /** 
       * The auth context login method
       * 
       * @param {Object} credentials
       */
      login: ({ username, password }) => {
         dispatch({ type: LOGIN, payload: { username, password } })
         UIActions.toggleLoading();

         if (process.env.NODE_ENV === "development") {
            setTimeout(() => {
               dispatch({ type: LOGIN_SUCCESS, payload: { user: "userData", token: "TOKENTOKENTOKENTOKENTOKENTOKEN" } });
               notie.alert({ type: "success", text: "Welcome back!" })
               UIActions.toggleLoading();
            }, 500)
         }
      },
      /** 
       * The auth context logout method
       * 
       */
      logout: () => {
         dispatch({ type: LOGOUT })


         dispatch({ type: LOGOUT_SUCCESS })
      },
      /** 
       * The auth context refresh token method
       * */
      refresh: () => {
      }
   })
}




