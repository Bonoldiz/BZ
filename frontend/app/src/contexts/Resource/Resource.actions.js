import Axios from "axios"
import notie from 'notie'
import { withIcon } from "../../utils/withIcon"
import { Transaction } from './Resource.reducer'

export const FETCH_RESOURCE = "FETCH_RESOURCE"
export const FETCH_RESOURCE_SUCCESS = "FETCH_RESOURCE_SUCCESS"
export const FETCH_RESOURCE_ERROR = "FETCH_RESOURCE_ERROR"

export const CREATE_RESOURCE = "CREATE_RESOURCE"
export const CREATE_RESOURCE_SUCCESS = "CREATE_RESOURCE_SUCCESS"
export const CREATE_RESOURCE_ERROR = "CREATE_RESOURCE_ERROR"

export const UPDATE_RESOURCE = "UPDATE_RESOURCE"
export const UPDATE_RESOURCE_SUCCESS = "UPDATE_RESOURCE_SUCCESS"
export const UPDATE_RESOURCE_ERROR = "UPDATE_RESOURCE_ERROR"

export const DELETE_RESOURCE = "DELETE_RESOURCE"
export const DELETE_RESOURCE_SUCCESS = "DELETE_RESOURCE_SUCCESS"
export const DELETE_RESOURCE_ERROR = "DELETE_RESOURCE_ERROR"

export const REGISTER_RESOURCE = "REGISTER_RESOURCE"
export const REGISTER_RESOURCE_SUCCESS = "REGISTER_RESOURCE_SUCCESS"
export const REGISTER_RESOURCE_ERROR = "REGISTER_RESOURCE_ERROR"

export const useResourceActions = (dispatch, state) => {
   const generateTransactionID = () => Math.random().toString(36).substr(2, 8) + '-' + Math.random().toString(36).substr(2, 8)

   return ({
      /* REMOTE actions */
      fetchResource: (resourceName) => {
         const transactionID = generateTransactionID()

         dispatch({ type: FETCH_RESOURCE, payload: { resourceName, transactionID } })

         Axios.get(`${process.API}${resourceName}`, { responseType: 'json', timeout: 10000 }).then(
            res => dispatch({ type: FETCH_RESOURCE_SUCCESS, payload: { resourceName, transactionID, data: res.data } })
         ).catch(
            err => dispatch({ type: FETCH_RESOURCE_ERROR, payload: { resourceName, transactionID, data: err } })
         )

         return transactionID
      },
      updateResource: (resourceName, id, data) => {
         const transactionID = generateTransactionID()

         dispatch({ type: UPDATE_RESOURCE, payload: { resourceName, transactionID } })

         Axios.post(`${process.API}${resourceName}/${id}`, data, { headers: { 'Content-Type': 'application/json' } }).then(
            res => { dispatch({ type: UPDATE_RESOURCE_SUCCESS, payload: { resourceName, transactionID, data: res.data } }); notie.alert(withIcon({ type: "success", text: ` <b>${resourceName.toUpperCase()}</b> updated ` })) }
         ).catch(
            err => { dispatch({ type: UPDATE_RESOURCE_ERROR, payload: { resourceName, transactionID, data: err } }); notie.alert(withIcon({ type: "error", text: `Could not update <b>${resourceName.toUpperCase()}</b> ` })) }
         )

         return transactionID
      },
      deleteResource: (resourceName, id) => {
         const transactionID = generateTransactionID()

         dispatch({ type: DELETE_RESOURCE, payload: { resourceName, transactionID } })

         Axios.delete(`${process.API}${resourceName}/${id}`, { responseType: 'json', timeout: 10000 }).then(
            res => { dispatch({ type: DELETE_RESOURCE_SUCCESS, payload: { resourceName, transactionID, data: res.data } }); notie.alert(withIcon({ type: "success", text: ` <b>${resourceName.toUpperCase()}</b> deleted ` })) }
         ).catch(
            err => { dispatch({ type: DELETE_RESOURCE_ERROR, payload: { resourceName, transactionID, data: err } }); notie.alert(withIcon({ type: "error", text: `Could not delete <b>${resourceName.toUpperCase()}</b> ` })) }
         )

         return transactionID
      },
      createResource: (resourceName, data) => {
         const transactionID = generateTransactionID()

         dispatch({ type: CREATE_RESOURCE, payload: { resourceName, transactionID } })

         Axios.put(`${process.API}${resourceName}`, data, { headers: { 'Content-Type': 'application/json' } }).then(
            res => { dispatch({ type: CREATE_RESOURCE_SUCCESS, payload: { resourceName, transactionID, data: res.data } }); notie.alert(withIcon({ type: "success", text: ` <b>${resourceName.toUpperCase()}</b> created ` })) }
         ).catch(
            err => { dispatch({ type: CREATE_RESOURCE_ERROR, payload: { resourceName, transactionID, data: err } }); notie.alert(withIcon({ type: "error", text: `Could not create <b>${resourceName.toUpperCase()}</b>   ` })) }
         )

         return transactionID
      },
      /* LOCAL actions */
      registerResource: (resourceName) => {
         dispatch({type:REGISTER_RESOURCE,payload:{resourceName}});
      },
      getResource: (resourceName) => {
         return state.resources.has(resourceName) ? state.resources.get(resourceName) : null;
      },
      getTransaction: (transactionID) => {
         return state.transactions.has(transactionID) ? state.transactions.get(transactionID) : null;
      },
      isFetched: (resourceName) => {
         return [...state.transactions.values()].filter(transaction => transaction.status === Transaction.status.success && transaction.type === Transaction.type.fetch).length
      }
   })
}




