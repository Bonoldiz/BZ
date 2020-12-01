import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/Auth.context'
import { Redirect } from 'react-router'

export const LoginComponent = () => {
   const { authState, authActions } = useContext(AuthContext)

   const signIn = (e) => {
      e.preventDefault();
      authActions.login({username:'test',password:'test'})
   }

   if(authState.loggedIn){
      return <Redirect to="" />
   }

   return (
      <div className="login-body container-fluid d-flex w-100 h-100 align-items-center">
         { /*<!-- sizing -->*/}
         <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4 ">
            {/* <!-- login card --> */}
            <div className="card card-login">
               <div className="card-body text-center">
                  <h3>Bazar Solidale</h3>
                  <form onSubmit={signIn}>
                     <div className="form-group ">
                        <input type="text" className="form-control" id="usernameInput" aria-describedby="username"
                           placeholder="Enter the username" />
                     </div>
                     <div className="form-group mt-4">
                        <input type="password" className="form-control" id="passwordInput" aria-describedby="password"
                           placeholder="Enter the password" />
                     </div>

                     <button className="btn btn-bazar pl-4 pr-4 btn-login mt-4">
                        login
                        </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}