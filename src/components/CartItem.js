import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({item, handledelete}) => {
    // console.log(item)
  return (
    <div className='cart-item'>
         <img className='cart-media' src={item.url} />
         <div className='d-flex flex-column justify-content-center align-items-center p-3'>
         <h3>{item.productName}</h3>
         <h3>${item.price}</h3>
         {/* <button className='btn btn-danger' onClick={()=>handledelete(item)}>Delete</button> */}
         <DeleteIcon onClick={()=>handledelete(item)} fontSize="large" style={{color:"red"}}/>
         </div> 
        

    </div>
  )
}

export default CartItem