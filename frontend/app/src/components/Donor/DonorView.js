import React, { useEffect, useState, useContext } from 'react'
import { Row } from '../DOM/Row'

import { Column, Table, SortDirection, AutoSizer } from 'react-virtualized'
import { useResource } from '../../hooks/Resource'
import { LoadingOverlay } from '../Overlay/Loading'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'

export const DonorView = ({ selectDonor }) => {
   const history = useHistory();

   const donor = useResource("donor")
   const { register, getValues, watch } = useForm();

   const [sortedData, setSortedData] = useState([]);
   const [sortDirection, setSortDirection] = useState(SortDirection.DESC)
   const [sortBy, setSortBy] = useState('id')

   useEffect(() => {
      donor.fetchResource()
   }, [])

   /**
    * Update the fetched data 
    */
   useEffect(() => {
      setSortedData(donor.getResource())
   }, [donor.getResource()])

   /**
    * Effect on sort/filter changes
    */
   useEffect(() => {
      if (donor.getResource() && sortedData) {
         var updatedSortedList = donor.getResource().filter(el => {
            let elIncludeTerm = false

            if (getValues("filteringTerm")) {
               for (let prop in el) {
                  if (prop !== "properties")
                     elIncludeTerm = (el[prop].toString().includes(getValues("filteringTerm")) ? true : elIncludeTerm)
               }
            } else {
               elIncludeTerm = true
            }

            return elIncludeTerm
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
      if(selectDonor)
         selectDonor(rowData.id)
      else
         history.push(`/donor/${rowData.id}`)
   }

   return <Row card>
      <div key="donorTableFilteringTermInput" large>
         <div className="form-group">
            <label htmlFor="filteringTerm">Filtering Term</label>
            <input type="text" className="form-control bg-light" id="filteringTerm" name="filteringTerm" ref={register} aria-describedby="textHelp" />
         </div>
      </div>

      <div key="donorTableRow" style={{ height: (window.innerHeight * 0.6) }} large>
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
                           <Column label="Name" dataKey="name" width={width / 3} />
                           <Column width={width / 3} label="Surname" dataKey="surname" />
                           <Column width={width / 3} label="Birthday" dataKey="birthDate" />
                        </Table>
                     </React.Fragment>
                     :
                     <LoadingOverlay value={{ show: true }} />
            }
         </AutoSizer>
      </div>
   </Row>
}