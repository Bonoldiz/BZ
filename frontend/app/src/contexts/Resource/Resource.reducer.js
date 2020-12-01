import { FETCH_RESOURCE, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_ERROR, CREATE_RESOURCE, CREATE_RESOURCE_SUCCESS, CREATE_RESOURCE_ERROR, DELETE_RESOURCE, DELETE_RESOURCE_SUCCESS, DELETE_RESOURCE_ERROR, UPDATE_RESOURCE, UPDATE_RESOURCE_SUCCESS, UPDATE_RESOURCE_ERROR, REGISTER_RESOURCE } from "./Resource.actions";

export const Transaction = {
   status: {
      failed: "failed",
      success: "success",
      processing: "processing"
   },
   type: {
      create: "create",
      update: "update",
      delete: "delete",
      fetch: "fetch",
   }
}

export const Resource = {
   donor: "donor",
   product: "product",
   warehouse: "warehouse"
}

/**
 * the initial Resources state
 */
export const initResourceState = { resources: new Map(), transactions: new Map() };

/** 
 * The reducer that is used in the Resource context
 * @see {@link https://it.reactjs.org/docs/hooks-reference.html#usereducer|React Reducer Hook} 
 */
export const ResourceReducer = (state, action) => {

   switch (action.type) {
      case REGISTER_RESOURCE:
         if(state.resources.get(action.payload.resourceName))
            return {...state}
         return {...state,...{resources: state.resources.set(action.payload.resourceName, [])}}
      case FETCH_RESOURCE:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.processing, type: Transaction.type.fetch }) } }
      case FETCH_RESOURCE_SUCCESS:
         return { ...state, ...{ resources: state.resources.set(action.payload.resourceName, action.payload.data), transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.success, type: Transaction.type.fetch }) } }
      case FETCH_RESOURCE_ERROR:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.failed, type: Transaction.type.fetch, data: action.payload.data }) } }

      case CREATE_RESOURCE:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.processing, type: Transaction.type.create }) } }
      case CREATE_RESOURCE_SUCCESS:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.success, type: Transaction.type.create }) } }
      case CREATE_RESOURCE_ERROR:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.failed, type: Transaction.type.create, data: action.payload.data }) } }
      
      case UPDATE_RESOURCE:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.processing, type: Transaction.type.update }) } }
      case UPDATE_RESOURCE_SUCCESS:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.success, type: Transaction.type.update }) } }
      case UPDATE_RESOURCE_ERROR:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.failed, type: Transaction.type.update, data: action.payload.data }) } }

      case DELETE_RESOURCE:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.processing, type: Transaction.type.delete }) } }
      case DELETE_RESOURCE_SUCCESS:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.success, type: Transaction.type.delete }) } }
      case DELETE_RESOURCE_ERROR:
         return { ...state, ...{ transactions: state.transactions.set(action.payload.transactionID, { resource: action.payload.resourceName, status: Transaction.status.failed, type: Transaction.type.delete, data: action.payload.data }) } }
      default:
         return { ...state }
   }
}