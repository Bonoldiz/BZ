import React, { useEffect } from 'react'

import { AuthContext } from './contexts/Auth/Auth.context'
import { LoginComponent } from './components/Login/Login'
import { LoadingOverlay } from './components/Overlay/Loading';

const App = React.lazy(() =>
   import(/* webpackChunkName: "app" */'./App.js').then(module => ({ default: module.App }))
);

/**
 * Entry component
 */
export const Entry = () => {
   const { authState, authActions } = React.useContext(AuthContext)

   useEffect(() => {
      // Auto login in develop
      if (process.env.NODE_ENV === "development") {
         setTimeout(() => {
            authActions.login({ username: "dev", password: "dev" })
         }, 200)

      }
   }, [])

   return (
      authState.loggedIn ?
         <div id='app-wrapper'>
            <React.Suspense fallback={<LoadingOverlay value={{ show: true }} />}>
               <App />
            </React.Suspense>
         </div > : <LoginComponent />
   )
}
