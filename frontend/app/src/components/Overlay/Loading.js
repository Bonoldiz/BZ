import React from 'react'

export const LoadingOverlay = ({ value: { show } }) => {
   return (
      <div className={'overlay-loading ' + ((show) ? 'loading-show' : '')}>
         <div className='row vh-100'>
            <div className='d-flex justify-content-center col-12'>
               <div className='my-auto'>
                  <div className='spinner-border ' role='status' style={{color:'#a65662',height:'3rem',width:'3rem'}}><span className='sr-only' >Loading...</span></div>
               </div>
            </div>
         </div>
      </div>
   )
}