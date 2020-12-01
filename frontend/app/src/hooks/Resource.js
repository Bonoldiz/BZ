import { useContext } from "react"
import { ResourceContext } from "../contexts/Resource/Resource.context"

export const useResource = (resourceName) => {
   const { state, actions } = useContext(ResourceContext);

   return {
      /* REMOTE actions */
      fetchResource: () => actions.fetchResource(resourceName),
      updateResource: (id, data) => actions.updateResource(resourceName, id, data),
      deleteResource: (id) => actions.deleteResource(resourceName, id),
      createResource: (data) => actions.createResource(resourceName, data),
      /* LOCAL actions */
      getResource: () => actions.getResource(resourceName),
      getTransaction: (transactionID) => actions.getTransaction(transactionID),
      isFetched : () => actions.isFetched(resourceName)
   }
}