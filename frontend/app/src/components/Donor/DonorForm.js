import React, { useState, useEffect } from 'react'
import { withIcon } from '../../utils/withIcon'

import notie from 'notie'
import { useForm } from 'react-hook-form'
import { Row } from '../DOM/Row'
import { useResource } from '../../hooks/Resource'
import { useHistory } from 'react-router'

export const DonorForm = ({onSubmit}) => {
   const donorAddForm = useForm();  

   useEffect(() => {
      if (donorAddForm.errors && Object.keys(donorAddForm.errors).length)
         notie.alert(withIcon({ type: "error", text: "Check your form and retry" }))
   }, [donorAddForm.errors])

   return <form onSubmit={donorAddForm.handleSubmit(onSubmit)}>
      <Row>
         <div className="form-group">
            <label htmlFor="donorNameInput">Name</label>
            <input ref={donorAddForm.register({ required: true })} name="name" type="text" className={donorAddForm.errors.name ? "form-control is-invalid" : "form-control"} id="donorNameInput" aria-describedby="donor name help" placeholder="Enter the donor name"></input>
         </div>

         <div className="form-group">
            <label htmlFor="donorSurnameInput">Surname</label>
            <input ref={donorAddForm.register({ required: true })} name="surname" type="text" className={donorAddForm.errors.surname ? "form-control is-invalid" : "form-control"} id="donorSurnameInput" aria-describedby="donor surname help" placeholder="Enter the donor surname"></input>
         </div>
         <div className="form-group">
            <label htmlFor="donorBirthDateInput">BirthDate</label>
            <input ref={donorAddForm.register({ required: true })} name="birthDate" type="date" className={donorAddForm.errors.birthDate ? "form-control is-invalid" : "form-control"} id="donorBirthDateInput" aria-describedby="donor name help" placeholder="Enter the donor birthday"></input>
         </div>
         <div className="form-group" small>
            <button type="submit" className="btn btn-success" id="submitAddDonorSelector"> Add Donor</button>
         </div>
      </Row>
   </form>
}