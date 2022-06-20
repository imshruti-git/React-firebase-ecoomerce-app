import React, { useEffect, useState } from 'react'
import { auth, fs } from '../firebase';
import CartItem from './CartItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';

const ShoppingCart = () => {

    const [cartitem, setCartitem] = useState([]);
    console.log(cartitem)
      useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
              fs.collection('cart' + user.uid).onSnapshot(snapshot => {
                const newCartProduct = snapshot.docs.map((doc) =>({
                  ID: doc.id,
                  ...doc.data(),
                }));
                // console.log(newCartProduct);
                setCartitem(newCartProduct)
              });
            }
            else{
              console.log("user not signed in")
            }
        })
      },[])

      // getting the value of qty from cartitems in separate array
      const allqty = cartitem.map((product)=>{
        return product.qty
      })

      console.log(allqty);

       const reducerOfQty = (accumulator, currentValue) => accumulator+currentValue;
       const totalqty = allqty.reduce(reducerOfQty, 0);

       console.log(totalqty);

    //geting the value of totalprice from cartitems in separate array
    const totalprice = cartitem.map((product)=>{
      return product.totalprice
    }) 

    console.log(totalprice)

    const reducerOfPrice = (accumulator, currentValue) => accumulator+currentValue;
    const finaltotalprice = totalprice.reduce(reducerOfPrice, 0);

    console.log(finaltotalprice);
    // Global variable
    let Product;

    const handleIncrease=(item)=>{
    //  console.log(item);
      Product= item;
      Product.qty =item.qty +1;
      Product.totalprice =item.price*item.qty;
    
    // update in firebase
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('cart' + user.uid).doc(item.Id).update(Product).then(()=>{console.log("icrement added")});
      }
      else{
        console.log('user is not logged in')
      }
    })  
    }
    const handleDecrease=(item)=>{
      // console.log("clicked decrease")
      Product= item;
      if(Product.qty >1){
      Product.qty =Product.qty -1;
      Product.totalprice =Product.qty*Product.price;
      }
       // update in firebase
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('cart' + user.uid).doc(item.Id).update(Product).then(()=>{console.log("decrement added")});
      }
      else{
        console.log('user is not logged in')
      }
    })
    }

    const handleDelete =(item)=>{
      // console.log(item);
      auth.onAuthStateChanged(user=>{
        if(user){
          fs.collection('cart' + user.uid).doc(item.Id).delete().then(()=>{console.log("deleted")})
        }
      })
    }
  return (
   <>
    {cartitem.length < 1 && (
      <div className='container mt-5'>
        <h3 className='pt-5'>NO ITEMS ARE IN THE CART</h3>
      </div>
    )}
    {cartitem.length>=1 &&(
       <div className='container d-flex flex-column align-items-center mt-5 pt-5'>
       {/* <h3>Your Cart Items...</h3><br/> */}
       {/* <div className='table-responsive'> */}
       <table className='table'>
        <tbody>
       {cartitem.map((item)=>(
        <tr>
          <th>
            <div>
              <CartItem key={item.Id} item={item} handledelete={handleDelete}/>
            </div>
          </th>
          <th style={{verticalAlign: 'middle'}}>
            <div className='d-flex'>
            <IconButton onClick={()=>handleIncrease(item)} >
                <AddIcon />
            </IconButton>
           
              <div className='qty'>
                 {item.qty}
              </div>
          <RemoveIcon onClick={()=>handleDecrease(item)}/>
          
            </div>
            <h3>${item.totalprice}</h3>
          </th>
          <th></th>
        </tr>
       ))}
         </tbody>
       </table>
        {/* </div> */}
       <div className='summary-cart d-flex flex-column justify-content-center'>
          <h2>Summary Cart</h2>
          Total Products: {totalqty}<br/>
          Total Amount:${finaltotalprice}<br/>
          <StripeCheckout />
       </div>
     </div>
    )}
   </>
  )
}

export default ShoppingCart