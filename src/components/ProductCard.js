import React from 'react'

function ProductCard({item, addtocart}) {
    // console.log(item)

    const handleAddToCart=()=>{
        addtocart(item);
    }
  return (
    <div className='card d-flex flex-column justify-content-center align-items-center'>
        <img className='media' src={item.url} />
        <h4>{item.productName}</h4>
        <h6>{item.desc}</h6>
        <h6>${item.price}</h6>
        <div className='btn btn-success custom-btn' onClick={handleAddToCart}>Add To cart</div>

    </div>
  )
}

export default ProductCard