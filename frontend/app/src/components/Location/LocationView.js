import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Row } from '../DOM/Row'

import { Column, Table, SortDirection, AutoSizer } from 'react-virtualized'
import { useResource } from '../../hooks/Resource'
import { LoadingOverlay } from '../Overlay/Loading'
import { useForm } from 'react-hook-form'

export const LocationView = ({ selectLocation,type }) => {
   const locations = useResource("location")
   const regions = useResource('region')
   const provinces = useResource('province')
   const municipalities = useResource('municipality')

   const { register, getValues, watch } = useForm();

   const [sortedData, setSortedData] = useState([]);
   const [sortDirection, setSortDirection] = useState(SortDirection.DESC)
   const [sortBy, setSortBy] = useState('id')

   useEffect(() => {
      locations.fetchResource()
      regions.fetchResource()
      provinces.fetchResource()
      municipalities.fetchResource()
   }, [])

   /**
    * Update the fetched data 
    */
   useEffect(() => {
      setSortedData(locations.getResource())
   }, [locations.getResource()])

   /**
    * Effect on sort/filter changes
    */
   useEffect(() => {
      if (locations.getResource() && sortedData) {
         var updatedSortedList = locations.getResource().filter(el => {
            let elIncludeTerm = false

            if (getValues("locationFilteringTerm")) {
               for (let prop in el) {
                  elIncludeTerm = (el[prop].toString().includes(getValues("locationFilteringTerm")) ? true : elIncludeTerm)
               }
            } else {
               elIncludeTerm = true
            }
            return elIncludeTerm && (type && el['type'].toString().includes(type.join(",")) ? true : false)
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
      selectLocation(rowData.id)
   }

   return <Row card>
      <div key="locationsTablelocationFilteringTermInput" large>
         <div className="form-group">
            <label htmlFor="locationFilteringTerm">Filtering Term</label>
            <input type="text" className="form-control bg-light" id="locationFilteringTerm" name="locationFilteringTerm" ref={register} aria-describedby="textHelp" />
         </div>
      </div>

      <div key="locationsTableRow" style={{ height: (window.innerHeight * 0.6) }} large>
         <AutoSizer>
            {
               ({ width, height }) =>
                  sortedData && provinces.getResource() && regions.getResource() && municipalities.getResource() ?
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
                           onRowClick={rowClickHandler} >
                           <Column label="Region" dataKey="region_code" width={width / 7} cellRenderer={({ cellData }) => regions.getResource().filter(region => region.code == cellData)[0].name} />
                           <Column label="Province" dataKey="province_code" width={width / 7} cellRenderer={({ cellData }) => provinces.getResource().filter(province => province.code == cellData)[0].name} />
                           <Column width={width / 7} label="Street" dataKey="street" />
                           <Column width={width / 7} label="Street Number" dataKey="streetNo" />
                           <Column width={width / 7} label="Type" dataKey="type" />
                           <Column width={width / 7} label="CAP" dataKey="CAP" />
                        </Table>
                     </React.Fragment>
                     :
                     <LoadingOverlay value={{ show: true }} />
            }
         </AutoSizer>
      </div>
   </Row>
}