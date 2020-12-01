import React, { useEffect, useState } from 'react'
import { Row } from '../DOM/Row'
import { useResource } from '../../hooks/Resource';
import { LoadingOverlay } from '../Overlay/Loading';

export const ProductCard = ({ name, state }) => {
   let icon = ""
   switch (name) {
      case "Stato":
         icon = "fas fa-shopping-cart fa-6x";
         break;
      case "Prezzo":
         icon = "fas fa-money-bill-wave fa-6x";
         break;
      case "Locazione":
         icon = "fas fa-warehouse fa-6x";
         break;
      default:
         icon = "fas fa-icons fa-6x";
         break;
   }

   return (
      <div>
         <div className="card-body">
            <div className="rotate">
               <i className={icon}></i>
            </div>
            <h6 className="text-uppercase" >{name}</h6>
            <h1 className="display-4">{state}</h1>
         </div>
      </div>
   )
}

const ProductProps = ({ prodProps }) => {
   return <div>
      <h3 className="card-title">Caratteristiche</h3>
      <table className="table table-striped">
         <tbody>
            {
               prodProps.map(
                  prop => <tr key={prop.key}>
                     <td>{prop.key}</td>
                     <td>{prop.value}</td>
                  </tr>
               )
            }
         </tbody>
      </table>
   </div>

}


const ProductHistory = ({ prodHistory }) => {
   return null
}

export const ProductDetail = ({ match: { params: { id } } }) => {
   const product = useResource("product")

   useEffect(() => {
      if (!product.getResource()) {
         product.fetchResource()
      }
   }, [])

   const getProduct = () => {
      return product.getResource().filter(prod => prod.id === id) ? product.getResource().filter(prod => prod.id == id)[0] : { name: "asdasdass" }
   }

   let name = "Scarpe"
   let state = "Disponibile"
   let price = "100$"
   let location = "Bazar"
   let description = "Lorem Bla Bla"

   const productProps = [{ key: "categoria", value: "abbigliamento" }, { key: "taglia", value: "XL" }]


   return (
      product.getResource() ?
         <React.Fragment>
            <Row card>
               <div large>
                  <h1 className="product-name">{ getProduct().name}</h1>
               </div>
               <ProductCard name="Stato" state={state} medium></ProductCard>
               <ProductCard name="Prezzo" state={price} medium></ProductCard>
               <ProductCard name="Locazione" state={location} medium></ProductCard>
            </Row>
            <Row card>
               <div large>
                  <h2>Descrizione</h2>
                  <p className="lead">{description}</p>
               </div>
            </Row>
            <Row card>
               <ProductProps prodProps={productProps} small></ProductProps>
            </Row>
         </React.Fragment>
         :
         <LoadingOverlay value={{ show: true }} />
   )
}