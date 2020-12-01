import React, { useState } from 'react'
import { DonorView } from './DonorView';
import { DonorAdd } from './DonorAdd';
import { Row } from '../DOM/Row';

export const DonorSelector = ({ selectDonor }) => {
   const [isSelected, setIsSelected] = useState(false)

   const _donorSelectCallback = (donor) => {
      selectDonor(donor);
      setIsSelected(true);
   }

   const cancelSelection = () => { selectDonor(-1); setIsSelected(false); }

   return <div id="accordion" large>
      <div className="card">
         <div className="card-header" >
            <h5 className="mb-0">
               <button className="btn" data-toggle="collapse" data-target="#collapseDonorView" aria-expanded="true" aria-controls="collapseDonorView" onClick={cancelSelection}>
                  <h3 large>Donor </h3>
               </button>
            </h5>
         </div>

         <div id="collapseDonorView" className={!isSelected ? "collapse" : "collapse hide"} data-parent="#accordion">
            <div className="card-body">
               <Row>
                  <div large>
                     <h4> Select a donor</h4>
                     <DonorView selectDonor={_donorSelectCallback} ></DonorView>
                  </div>
               </Row>
            </div>
         </div>
      </div>
   </div >
}