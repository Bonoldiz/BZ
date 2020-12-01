import React from 'react'

const renderCol = (child) =>
   <div key={child.props.key} className={child.props.large ? "col-sm-12 col-md-12 col-lg-12 mt-4" : child.props.medium ? "col-sm-12 col-md-6 col-lg-6 mt-4" : child.props.small ? "col-sm-12 col-md-6 col-lg-4 mt-4" : "col-sm-12 col-md-6 col-lg-6 mt-4"}>
      {child}
   </div>

const renderCardCol = (child) =>
   <div key={child.props.key} className={child.props.large ? "col-sm-12 col-md-12 col-lg-12 mt-4" : child.props.medium ? "col-sm-12 col-md-6 col-lg-6 mt-4" : child.props.small ? "col-sm-12 col-md-6 col-lg-4 mt-4" : "col-sm-12 col-md-6 col-lg-6 mt-4"}>
      <div className="card bg-light">
         <div className="card-body">
            {child}
         </div>
      </div>
   </div>

export const Row = ({ children, card }) => {
   return (
      <div className="row">
         {children ?
            children.length ?
               children.map(child => (card ? renderCardCol(child) : renderCol(child)))
               :
               (card ? renderCardCol(children) : renderCol(children))
            : null
         }
      </div>
   )
}