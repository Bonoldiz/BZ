import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/Auth.context'
import { UIContext } from '../../contexts/UI/UI.context'

/**
 * Navbar component
 */
export const Navbar = (props) => {
   const { authActions } = useContext(AuthContext)
   const { UIState } = useContext(UIContext)

   const logout = () => {
      authActions.logout();
   }

   return (
      <nav id='app-sidebar' className={' bg-bz-blue text-white ' + (UIState.navbar.show ? 'active' : '')} >
         <Link to='/' >
            <div id='app-sidebar-header'>
               <h3>Bazar Solidale </h3>
            </div>
         </Link>


         <ul className='list-unstyled app-sidebar-items'>
            <li>
               <a href='#productsSubmenu' data-toggle='collapse' aria-expanded='false'
                  className='dropdown-toggle'>Products</a>
               <ul className='collapse list-unstyled' id='productsSubmenu'>
                  {//                  <li>
                     //                     <Link to="/products/overview" >Overview</Link>
                     //                  </li>
                  }
                  <li>
                     <Link to="/products/manage" >Find a Product</Link>
                  </li>
                  <li>
                     <Link to="/products/add" >Add a Product</Link>
                  </li>
               </ul>
            </li>
            <li>
               <a href='#warehousesSubmenu' data-toggle='collapse' aria-expanded='false'
                  className='dropdown-toggle'>Bazars</a>
               <ul className='collapse list-unstyled' id='warehousesSubmenu'>
                  {/*</ul>{<li>
                     <a href='/bazars/overview'>Overview</a>
                  </li>*/}
                  <li>
                     <Link to='/bazars/manage'>Find a Bazar</Link>
                  </li>
               </ul>
            </li>

            <li>
               <a href='#donorsSubmenu' data-toggle='collapse' aria-expanded='false'
                  className='dropdown-toggle'>Donors</a>
               <ul className='collapse list-unstyled' id='donorsSubmenu'>
                  <li>
                     <Link to='/donors/manage'>Find a Donor</Link>
                  </li>
                  <li>
                     <Link to='/donors/add'>Add a Donor</Link>
                  </li>
               </ul>
            </li>

            <li>
               <a href='#'>Employes</a>
            </li>

            <hr />
            <li>
               <a href='/account'>Account</a>
            </li>
            <hr />
            <li>
               <div className='p-2 d-flex' >
                  <button className='btn btn-warning ml-auto mr-auto align-self-end' onClick={logout}>
                     Logout
                        </button>
               </div>
            </li>
         </ul>
      </nav >
   )
}

export default Navbar