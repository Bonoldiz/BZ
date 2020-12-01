/* SETUP */
import(/* webpackChunkName: "styles" */'./styles/app.scss')
import('bootstrap/dist/js/bootstrap.bundle.min.js')

import './manifest.webmanifest'

import notie from 'notie'

notie.setOptions({
   positions: {
      alert: 'bottom',
      force: 'bottom',
      confirm: 'bottom',
      input: 'bottom',
      select: 'bottom',
      date: 'bottom'
   }
})

import React from 'react'
import ReactDOM from 'react-dom'

import { AuthProvider } from './src/contexts/Auth/Auth.provider'
import { UIProvider } from './src/contexts/UI/UI.provider'
import { Entry } from './src/Entry'
import { PropsProvider } from './src/contexts/Props/Props.provider'
import { ResourceProvider } from './src/contexts/Resource/Resource.provider'

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
   const registration = runtime.register();
}

ReactDOM.render(<UIProvider>
   <AuthProvider>
      <ResourceProvider>
         <PropsProvider>
            <Entry />
         </PropsProvider>
      </ResourceProvider>
   </AuthProvider>
</UIProvider>, document.getElementById('root'))