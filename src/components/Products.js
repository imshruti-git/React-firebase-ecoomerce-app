import React from 'react'
import ProductCard from './ProductCard'

const Products = ({ products, addtocart }) => {

  // console.log(products)
  return products.map((item) =>(
      <ProductCard key={item.Id} item={item} addtocart={addtocart}/>
  ))
    
  
}

export default Products