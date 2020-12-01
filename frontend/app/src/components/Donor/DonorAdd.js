import React, { useState, useEffect } from 'react'
import { LocationSelector } from '../Location/LocationSelector'
import { withIcon } from '../../utils/withIcon'

import notie from 'notie'
import { useForm } from 'react-hook-form'
import { Row } from '../DOM/Row'
import { useResource } from '../../hooks/Resource'
import { useHistory } from 'react-router'

import { DonorForm } from './DonorForm'

export const DonorAdd = () => {
   const history = useHistory()
   const [selectedLocation, setLocation] = useState(null)
   const [addTransaction, setTransaction] = useState()
   const donor = useResource('donor')

   const donorForm = useForm();

   useEffect(() => {
      if (selectedLocation && selectedLocation >= 0) {
         notie.alert(withIcon({ type: "success", text: "Location selected" }))
      }
   }, [selectedLocation])

   useEffect(() => {
      if (donor.getTransaction(addTransaction) && donor.getTransaction(addTransaction).status === "success")
         history.push('/donors/manage')
   }, [donor.getTransaction(addTransaction)])

   const onSubmit = (values) => {
      setTransaction(donor.createResource({ ...values, ...{ residenceID: selectedLocation } }))
   }

   return <React.Fragment >
      <Row>

         <ul className="progressbar" large>
            <li className={selectedLocation !== null && selectedLocation >= 0 ? "active m-auto" : ""}>Location</li>
            <li className="">Donor</li>
         </ul>

         <LocationSelector type={["donor"]} selectLocation={setLocation} large />

         <div id="accordion" large>
            <div className="card">
               <div className="card-header" >
                  <h5 className="mb-0">
                     <button className="btn" data-toggle="collapse" data-target="#collapseDonorAdd" aria-expanded="true" aria-controls="collapseDonorAdd">
                        <h3 large>Donor</h3>
                     </button>
                  </h5>
               </div>

               <div id="collapseDonorAdd" className={selectedLocation !== null && selectedLocation >= 0 ? "collapse show" : "collapse hide"} data-parent="#accordion">
                  <div className="card-body">
                     <DonorForm onSubmit={onSubmit} />
                  </div>
               </div>
            </div>
         </div>
      </Row>
   </React.Fragment>
}