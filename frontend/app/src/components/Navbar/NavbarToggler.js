import React, { useContext } from 'react'
import { UIContext } from '../../contexts/UI/UI.context';
import { withRouter, useLocation } from 'react-router';

export const NavbarToggler = () => {
   const {UIState,UIActions} = useContext(UIContext)

   const toggleSidebar = () => {
      UIActions.toggleNavbar()
   }

   return <nav className={'app-toggler navbar navbar-expand-lg bg-light m-3 '+ (UIState.navbar.show ? 'active' : '') } >
      <div className='container-fluid m-2'>
         <button type='button' id='sidebarToggler' className={'btn btn-bazar '+ (UIState.navbar.show ? 'active' : '') } onClick={toggleSidebar}>
            <i className='fas fa-arrow-left'></i>
         </button>

         <h3 className='nav-item ml-auto mr-4 mb-0 app-toggle-title'>Bazar Solidale<span className='sr-only'>(current)</span></h3>
      </div>
   </nav>;
}