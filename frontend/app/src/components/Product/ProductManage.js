import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Row } from '../DOM/Row'

import { Column, Table, SortDirection, AutoSizer } from 'react-virtualized'
import { useResource } from '../../hooks/Resource'
import { LoadingOverlay } from '../Overlay/Loading'
import { PropsContext } from '../../contexts/Props/Props.context'
import { PropertiesInput } from '../../test/PropertyInput'
import { useLocation, useHistory, Redirect } from 'react-router'
import { useForm } from 'react-hook-form'

export const ProductManage = () => {
   const history = useHistory();
   const { propsState: { props } } = useContext(PropsContext)

   const product = useResource("product")
   const { register, getValues, watch } = useForm();

   const [filteringProps, setFilteringProps] = useState([])

   const [sortedData, setSortedData] = useState([]);
   const [sortDirection, setSortDirection] = useState(SortDirection.DESC)
   const [sortBy, setSortBy] = useState('id')

   useEffect(() => {
      product.fetchResource()
   }, [])

   /**
    * Update the fetched data 
    */
   useEffect(() => {
      setSortedData(product.getResource())
   }, [product.getResource()])

   /**
    * Effect on sort/filter changes
    */
   useEffect(() => {
      if (product.getResource() && sortedData && filteringProps) {
         var updatedSortedList = product.getResource().filter(el => {
            let elIncludeTerm = false
            let elIncludeProps = false

            if (getValues("filteringTerm")) {
               for (let prop in el) {
                  if (prop !== "properties")
                     elIncludeTerm = (el[prop].toString().includes(getValues("filteringTerm")) ? true : elIncludeTerm)
               }
            } else {
               elIncludeTerm = true
            }

            if (filteringProps.length) {
               elIncludeProps = filteringProps.some(filteringProp => {
                  return !el['properties'].includes(filteringProp.v_prop_id)
               })
            }

            return elIncludeTerm && !elIncludeProps
         })

         updatedSortedList.sort((firstElement, secondElement) => {
            // Checks for String
            if (firstElement[sortBy].localeCompare) {
               return ((sortDirection === SortDirection.ASC) ? firstElement[sortBy].localeCompare(secondElement[sortBy]) : secondElement[sortBy].localeCompare(firstElement[sortBy]))
            }
            // return Number comparison otherwise
            return ((sortDirection === SortDirection.ASC) ? firstElement[sortBy] - secondElement[sortBy] : secondElement[sortBy] - firstElement[sortBy])
         })



         if (JSON.stringify(updatedSortedList) !== JSON.stringify(sortedData)) {
            setSortedData(updatedSortedList)
         }
      }

   }, [watch()])


   const sort = (sortEvent) => {
      setSortBy(() => sortEvent.sortBy)
      setSortDirection(() => sortEvent.sortDirection)
   }

   const rowClickHandler = ({ rowData }) => {
      history.push(`/product/${rowData.id}`)
   }

   return <Row card>
      <div key="productTableFilteringTermInput" large>
         <div className="form-group">
            <label htmlFor="filteringTerm">Filtering Term</label>
            <input type="text" className="form-control bg-light" id="filteringTerm" name="filteringTerm" ref={register} aria-describedby="textHelp" />
         </div>
         <div className="form-group">
            <label htmlFor="filteringProps">Filtering Properties</label>
            <PropertiesInput name="filteringProps" id="filteringProps" updateValues={setFilteringProps} />
         </div>
      </div>

      <div key="productTableRow" style={{ height: (window.innerHeight * 0.6) }} large>
         <AutoSizer>
            {
               ({ width, height }) =>
                  sortedData ?
                     <React.Fragment>
                        <Table
                           className='bazar-table'
                           width={width}
                           height={height}
                           headerHeight={50}
                           rowHeight={50}
                           sort={sort}
                           rowCount={sortedData.length}
                           rowGetter={({ index }) => sortedData[index]}
                           sortBy={sortBy}
                           sortDirection={sortDirection}
                           onRowClick={rowClickHandler}
                        >
                           <Column label="ID" dataKey="id" width={width / 12} />
                           <Column label="Name" dataKey="name" width={width / 2} />
                           <Column width={width / 2} label="Description" dataKey="description" />
                        </Table>
                     </React.Fragment>
                     :
                     <LoadingOverlay value={{ show: true }} />
            }
         </AutoSizer>
      </div>
   </Row>
}