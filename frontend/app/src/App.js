import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom"

import Navbar from './components/Navbar/Navbar'

import { LoadingOverlay } from './components/Overlay/Loading'
import { NavbarToggler } from './components/Navbar/NavbarToggler'
import { UIContext } from './contexts/UI/UI.context'

import { ProductManage } from './components/Product/ProductManage'
import { ProductDetail } from './components/Product/ProductDetail'
import { InputTestComponent } from './test/InputsTest'
import { AlertsTestComponent } from './test/AlertsTest'
import { ResourcesTestComponent } from './test/ResourcesTest'
import { isMobile } from './utils/isMobile'
import { DonorView } from './components/Donor/DonorView'
import { ProductAdd } from './components/Product/ProductAdd'
import { DonorAdd } from './components/Donor/DonorAdd'

/**
 * Bazar application component
 */
export const App = () => {
   const { UIState, UIActions } = useContext(UIContext)

   return <BrowserRouter>
      <Navbar />
      <div className={'app-content ' + (UIState.navbar.show ? 'active' : '')}>

         {/* NON-CONTENT UI */}
         <LoadingOverlay value={{ show: UIState.loading }} />
         <NavbarToggler />

         { /* APP CONTENT */}
         <div className="app-content-section container"
            onClick={() => {
               (isMobile() && !UIState.navbar.show) ? UIActions.toggleNavbar() : null
            }}>
            <Switch>
               { /* PRODUCTS */}
               {/*<Route path="/products/overview" component={ProductOverview} />*/}
               <Route path="/products/manage" component={ProductManage} />
               <Route path="/product/:id" component={ProductDetail} />
               <Route path="/products/add" component={ProductAdd} />


               { /* DONORS */}
               <Route path="/donors/manage" component={DonorView} />
               <Route path="/donors/add" component={DonorAdd} />
               {
                  (process.env.NODE_ENV === "development") ? <React.Fragment>
                     <Route path="/test/inputs" component={InputTestComponent} />
                     <Route path="/test/alerts" component={AlertsTestComponent} />
                     <Route path="/test/resources" component={ResourcesTestComponent} />
                  </React.Fragment>
                     : null
               }
            </Switch>
         </div>
      </div>
   </BrowserRouter>
}