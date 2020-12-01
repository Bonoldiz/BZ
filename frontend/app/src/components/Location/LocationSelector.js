import React, { useState } from 'react'
import { LocationAdd } from './LocationAdd'
import { LocationView } from './LocationView'
import { Row } from '../DOM/Row'

export const LocationSelector = ({ type, selectLocation }) => {
   const [isSelected, setIsSelected] = useState(false)

   const _locationSelectCallback = (location) => {
      selectLocation(location);
      setIsSelected(true);
   }

   const cancelSelection = () => { selectLocation(-1); setIsSelected(false); }

   return <div id="accordion" large>
      <div className="card">
         <div className="card-header" >
            <h5 className="mb-0">
               <button className="btn" data-toggle="collapse" data-target="#collapseLocationView" aria-expanded="true" aria-controls="collapseLocationView" onClick={cancelSelection}>
                  <h3 large>Location </h3>
               </button>
            </h5>
         </div>

         <div id="collapseLocationView" className={!isSelected ? "collapse" : "collapse hide"} data-parent="#accordion">
            <div className="card-body">
               <Row>
                  <div medium>
                     <h4> Select a location</h4>
                     <LocationView selectLocation={_locationSelectCallback} type={type}></LocationView>
                  </div>
                  <div medium>
                     <h4>Add a new location</h4>
                     <LocationAdd type={type} ></LocationAdd>
                  </div>

               </Row>
            </div>
         </div>
      </div>
   </div >
}
