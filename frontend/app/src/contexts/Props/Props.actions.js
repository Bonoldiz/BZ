import React from 'react'

export const FETCH_PROPS = "FETCH_PROPS"
export const FETCH_PROPS_SUCCESS = "FETCH_PROPS_SUCCESS"
export const FETCH_PROPS_ERROR = "FETCH_PROPS_ERROR"

/**
 * Props actions and utilities
 * 
 * @param {method} dispatch - the dispach method to use
 */
export const usePropsActions = (dispatch,{props,links}) => {
   return ({
      fetchProps(){
         dispatch({type:FETCH_PROPS})

         if(process.env.NODE_ENV === "development"){
            dispatch({type:FETCH_PROPS_SUCCESS,payload:{propertiesTree}})
         }
      },
      getProperty(propID){
         return props.filter(prop => prop.id === propID).length ? props.filter(prop => prop.id === propID)[0] : null;
      },
      getLinks(domainID){
         return links.filter(link => link.d_prop_id == domainID).length ? links.filter(link => link.d_prop_id == domainID) : [];
      }
   })
}


const propertiesTree = JSON.parse(`{
   "props":[
      {
         "id":0,
         "name":"_root_"
      },
      {
         "id":1,
         "name":"mobile"
      },
      {
         "id":2,
         "name":"arte"
      },
      {
         "id":3,
         "name":"abbigliamento"
      },
      {
         "id":4,
         "name":"colore"
      },
      {
         "id":5,
         "name":"rosso"
      },
      {
         "id":6,
         "name":"blue"
      },
      {
         "id":7,
         "name":"taglia"
      },
      {
         "id":8,
         "name":"L"
      },
      {
         "id":9,
         "name":"XL"
      },
      {
         "id":10,
         "name":"tonalita"
      },
      {
         "id":11,
         "name":"acceso"
      },
      {
         "id":12,
         "name":"spento"
      }
   ],
   "links":[
      {
         "d_prop_id":0,
         "v_prop_id":1,
         "save":true
      },
      {

         "d_prop_id":0,
         "v_prop_id":2,
         "save":true
      },
      {

         "d_prop_id":0,
         "v_prop_id":3,
         "save":true
      },
      {

         "d_prop_id":1,
         "v_prop_id":4
      },
      {

         "d_prop_id":2,
         "v_prop_id":4
      },
      {

         "d_prop_id":4,
         "v_prop_id":5,
         "save":true
      },
      {

         "d_prop_id":4,
         "v_prop_id":6,
         "save":true
      },
      {

         "d_prop_id":4,
         "v_prop_id":10
      },
      {
    
         "d_prop_id":3,
         "v_prop_id":4
      },
      {
       
         "d_prop_id":3,
         "v_prop_id":7
      },
      {
     
         "d_prop_id":7,
         "v_prop_id":8,
         "save":true
      },
      {
     
         "d_prop_id":7,
         "v_prop_id":9,
         "save":true
      },
      {
  
         "d_prop_id":10,
         "v_prop_id":11,
         "save":true
      },
      {
 
         "d_prop_id":10,
         "v_prop_id":12,
         "save":true
      }
   ]
}`)



