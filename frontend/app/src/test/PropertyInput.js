import React, { useContext } from 'react'
import { PropsContext } from '../contexts/Props/Props.context'

const propElement = ({ d_prop_id, v_prop, isDisabled }, callback) => {
   return (
      <li
         key={v_prop.id}
         style={{ cursor: "pointer" }}
         className={"list-group-item " + (isDisabled ? "disabled" : "")}
         onClick={
            () => {
               callback({ d_prop_id, v_prop_id: v_prop.id })
            }
         } >
         {v_prop.name}
      </li >
   )
}

/**
 * Custom input that handles the property tree
 */
export const PropertiesInput = ({ updateValues, name }) => {
   const { propsState: { props, links }, propsActions } = useContext(PropsContext);

   const [selectedLinks, setSelectedLinks] = React.useState([])
   const [baseDomain, setBaseDomain] = React.useState(0)
   const [currentDomain, setCurrentDomain] = React.useState(0)

   const addProperty = ({ d_prop_id, v_prop_id }) => {
      // Checks if the value has to be saved
      if (links.filter(link => link.d_prop_id == d_prop_id && link.v_prop_id == v_prop_id)[0].save) {
         setSelectedLinks(oldValue => [...oldValue, { d_prop_id, v_prop_id }])
      }

      if (d_prop_id === 0) {
         setBaseDomain(() => v_prop_id)
      }

      setCurrentDomain(() => v_prop_id)
   }

   const isLinkSelected = ({ d_prop_id, v_prop_id }) => {
      return selectedLinks.filter(link => link.d_prop_id == d_prop_id && link.v_prop_id == v_prop_id).length
   }

   const removeProperty = ({ d_prop_id, v_prop_id }) => {
      if (d_prop_id === 0) {
         setBaseDomain(() => 0)
         setCurrentDomain(() => 0)
         setSelectedLinks(() => [])
      }
      setSelectedLinks(oldProps => oldProps.filter(link => !(link.d_prop_id == d_prop_id && link.v_prop_id == v_prop_id)))
   }

   React.useEffect(() => {
      (props && links && propsActions.getLinks(currentDomain).length === 0) ? setCurrentDomain(() => baseDomain) : null
   }, [currentDomain])

   React.useEffect(() => {
      updateValues(selectedLinks)
   }, [selectedLinks])

   React.useEffect(() => {
      propsActions.fetchProps()
   }, [])

   return (
      (!props || !links) ? null :
         <React.Fragment>
            <ul className="list-group">
               <li className="list-group-item border-0 bg-light">
                  <span className="badge badge-bazar m-2 p-2 " style={{ cursor: "pointer" }} onClick={() => {
                     if (baseDomain && currentDomain != baseDomain)
                        setCurrentDomain(() => baseDomain)
                  }
                  }>
                     <i className="fas fa-arrow-left"></i>
                  </span>

                  {
                     selectedLinks.map(
                        ({ d_prop_id, v_prop_id }) =>
                           <span className="badge badge-bazar m-2 p-2 "
                              style={{ cursor: "pointer" }}
                              key={v_prop_id}>
                              <i onClick={
                                 () => {
                                    removeProperty({ d_prop_id, v_prop_id })
                                 }
                              } className="fas fa-times mr-1"></i>
                              {propsActions.getProperty(v_prop_id).name} </span>
                     )
                  }
               </li>

            </ul>
            <ul className="list-group list-group-props">

               {
                  propsActions.getLinks(currentDomain).map(
                     ({ d_prop_id, v_prop_id }) => {
                        return propElement({ d_prop_id, v_prop: propsActions.getProperty(v_prop_id), isDisabled: isLinkSelected({ d_prop_id, v_prop_id }) }, addProperty)
                     }
                  )
               }
            </ul>

         </React.Fragment>


   )
}