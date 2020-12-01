import React, { useState, useEffect } from 'react'
import { LocationSelector } from '../Location/LocationSelector'
import { Row } from '../DOM/Row'
import { DonorSelector } from '../Donor/DonorSelector'
import notie from 'notie'
import { PropertiesInput } from '../../test/PropertyInput'
import { useForm } from 'react-hook-form'
import { withIcon } from '../../utils/withIcon'
import { useResource } from '../../hooks/Resource'
import { useHistory } from 'react-router'

export const ProductAdd = () => {
   const history = useHistory()
   const product = useResource('product')
   const [selectedLocation, setLocation] = useState(null)
   const [selectedDonor, setDonor] = useState(null)
   const [addTransaction, setTransaction] = useState()
   const [productProps, setProductProps] = useState([])

   const productAddForm = useForm()

   const onSubmit = (values) => {
      if (productProps.length === 0)
         notie.alert(withIcon({ type: "error", text: "Check the product properties and retry" }))
      else
         setTransaction(product.createResource({ ...values, ...{ properties: productProps, personID: selectedDonor, employeeID: 0 } }))
   }

   useEffect(() => {
      if (product.getTransaction(addTransaction) && product.getTransaction(addTransaction).status === "success")
         history.push('/products/manage')
   }, [product.getTransaction(addTransaction)])


   useEffect(() => {
      if (productAddForm.errors && Object.keys(productAddForm.errors).length)
         notie.alert(withIcon({ type: "error", text: "Check your form and retry" }))
   }, [productAddForm.errors])


   return <Row>
      <ul className="progressbar" large>
         <li className={selectedLocation !== null && selectedLocation >= 0 ? "active" : ""}>Location</li>
         <li className={selectedDonor !== null && selectedDonor !== null && selectedDonor >= 0 ? "active" : ""}>Donor</li>
         <li className="">Product</li>
      </ul>

      <LocationSelector type={["bazar"]} selectLocation={setLocation} large />

      <DonorSelector selectDonor={setDonor} large></DonorSelector>

      <div id="accordion" large>
         <div className="card">
            <div className="card-header" >
               <h5 className="mb-0">
                  <button className="btn" data-toggle="collapse" data-target="#collapseProductAdd" aria-expanded="true" aria-controls="collapseProductAdd">
                     <h3 large>Product</h3>
                  </button>
               </h5>
            </div>

            <div id="collapseProductAdd" className={selectedDonor !== null && selectedDonor !== null && selectedDonor >= 0 ? "collapse show" : "collapse hide"} data-parent="#accordion">
               <div className="card-body">
                  <PropertiesInput name="productProps" id="productProps" updateValues={setProductProps} />
                  <form onSubmit={productAddForm.handleSubmit(onSubmit)}>
                     <Row>
                        <div className="form-group" medium>
                           <label htmlFor="productNameInput">Name</label>
                           <input ref={productAddForm.register({ required: true })} name="name" type="text" className={productAddForm.errors.name ? "form-control is-invalid" : "form-control"} id="productNameInput" aria-describedby="product name help" placeholder="Enter the product name"></input>
                        </div>

                        <div className="form-group" medium>
                           <label htmlFor="productDescInput">Description</label>
                           <textarea ref={productAddForm.register({ maxLength: 255 })} name="description" type="textarea" className={productAddForm.errors.description ? "form-control is-invalid" : "form-control"} id="productDescInput" aria-describedby="product name help" placeholder="Enter the product description"></textarea>
                        </div>
                        <div className="form-group" medium>
                           <label htmlFor="productPriceInput">Price</label>
                           <input ref={productAddForm.register({ pattern: /^\d+(,\d{1,2})?$/ , required:true })} name="price" type="text" className={productAddForm.errors.price ? "form-control is-invalid" : "form-control"} id="productPriceInput" aria-describedby="product name help" placeholder="Enter the product price"></input>
                        </div>
                        <div className="form-group" small>
                           <button type="submit" className="btn btn-success" id="submitAddProduct"> Add Product</button>
                        </div>
                     </Row>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </Row>
}