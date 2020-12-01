import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useResource } from '../../hooks/Resource'
import { Row } from '../DOM/Row'
import notie from "notie"
import { useHistory } from 'react-router'
import { withIcon } from '../../utils/withIcon'

export const LocationAdd = ({ type }) => {
   const history = useHistory()
   const location = useResource('location')
   const regions = useResource('region')
   const provinces = useResource('province')
   const municipalities = useResource('municipality')
   const [createTransaction, setTransaction] = useState(null)

   const { errors, watch, register, handleSubmit } = useForm()
   const watchRegion = watch('region_code')
   const watchProvince = watch('province_code')
   const watchMunicipality = watch('municipality_code')

   useEffect(() => {
      regions.fetchResource()
      provinces.fetchResource()
      municipalities.fetchResource()
      location.fetchResource()
   }, [])
   
   useEffect(() => {
      if (errors && Object.keys(errors).length)
         notie.alert(withIcon({ type: "error", text: "Check your form and retry" }))
   }, [errors])

   const onSubmit = (values) => {
      setTransaction(location.createResource({ ...values, ...{ location_type: type } }))
   }

   return <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
         <div className="form-group" small>
            <label htmlFor="regionSelector">Region</label>
            <select className={errors.region_code ? "form-control is-invalid" : "form-control"} id="regionSelector" name="region_code" ref={register({required:true})}>
               {regions.getResource() ?
                  regions.getResource().sort((region1, region2) => region1.name.localeCompare(region2.name)).map(region => <option key={region.code} value={region.code}>{region.name}</option>)
                  : null}
            </select>
         </div>
         <div className="form-group" small>
            {provinces.getResource() && watchRegion ?
               <React.Fragment><label htmlFor="provinceSelector">Province</label>
                  <select className={errors.province_code ? "form-control is-invalid" : "form-control"} id="provinceSelector" name="province_code" ref={register({required:true})}>
                     {provinces.getResource()
                        .filter(province => province.region_code == watchRegion)
                        .sort((province1, province2) => province1.acronym.localeCompare(province2.acronym))
                        .map(province => <option key={province.code} value={province.code}>{province.acronym} - {province.name}</option>)}
                  </select>
               </React.Fragment>
               : null}
         </div>

         <div className="form-group" small>
            {municipalities.getResource() && watchRegion && watchProvince ?
               <React.Fragment>
                  <label htmlFor="municipalitySelector">Municipality</label>
                  <select className={errors.municipality_code ? "form-control is-invalid" : "form-control"} id="municipalitySelector" name="municipality_code" ref={register({required:true})}>
                     {municipalities.getResource()
                        .filter(municipality => municipality.province_code == watchProvince)
                        .sort((municipality1, municipality2) => municipality1.acronym.localeCompare(municipality2.acronym))
                        .map(municipality => <option key={municipality.code} value={municipality.code}>{municipality.name}</option>)}
                  </select>
               </React.Fragment>
               : null}
         </div>

         <div className="form-group" small>
            {municipalities.getResource() && watchRegion && watchProvince && watchMunicipality ?
               <React.Fragment>
                  <label htmlFor="CAPSelector">CAP</label>
                  <select className={errors.CAP ? "form-control is-invalid" : "form-control"} id="CAPSelector" name="CAP" ref={register({required:true})}>
                     {
                        municipalities.getResource()
                           .filter(municipality => municipality.code == watchMunicipality)[0]
                           .cap.sort((CAP1, CAP2) => CAP1.acronym.localeCompare(CAP2.acronym))
                           .map(CAP => <option key={CAP} value={CAP}>{CAP}</option>)
                     }
                  </select>
               </React.Fragment>
               : null}
         </div>

         <div className="form-group" small>
            {municipalities.getResource() && watchRegion && watchProvince && watchMunicipality ?
               <React.Fragment>
                  <label htmlFor="streetSelector">Street</label>
                  <input type="text" className={errors.street ? "form-control is-invalid" : "form-control"} id="streetSelector" name="street" ref={register({required:true})} />
               </React.Fragment>
               : null}
         </div>
         <div className="form-group" small>
            {municipalities.getResource() && watchRegion && watchProvince && watchMunicipality ?
               <React.Fragment>
                  <label htmlFor="streetNoSelector">Street Number</label>
                  <input type="number" className={errors.streetNo ? "form-control is-invalid" : "form-control"} id="streetNoSelector" name="streetNo" ref={register({required:true})} />
               </React.Fragment>
               : null}
         </div>

         <div className="form-group" small>
            <button type="submit" className="btn btn-success" id="submitSelector" name="submit"> Add Location </button>
         </div>
      </Row>
   </form>

}