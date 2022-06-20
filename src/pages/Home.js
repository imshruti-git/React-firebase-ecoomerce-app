import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import {useNavigate} from 'react-router-dom'
import { auth, fs } from '../firebase';

const Home = () => {

  const navigate= useNavigate();
  //getting user id
  function GetUserId(){
    const [uid, setUid] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid)
        }
      })
    },[])
    return uid;
  }

  const uid = GetUserId();

  // //getting current user function
  // function GetCurrentUser(){
  //   const [user, setUser] = useState(null);
  //   useEffect(()=>{
  //     auth.onAuthStateChanged(user=>{
  //       if(user){
  //           fs.collection('users').doc(user.uid).get().then(snapshot=>{
  //             setUser(snapshot.data().Name);
  //           })
  //       }
  //       else{
  //         setUser(null);
  //       }
  //     })
  //   }, [])
  //   return user;
  // }

  // const user = GetCurrentUser();
  // // console.log(user);

  const [products, setProducts] = useState([]);
  const getProducts = async()=>{ 
    const products = await fs.collection('Products').get();
    const productArray =[];
    for (var snap of products.docs){
      var data = snap.data();
      data.Id =snap.id;
      productArray.push({
        ...data
      })
      if(productArray.length === products.docs.length){
        setProducts(productArray);
        // console.log(productArray)
    }
    }
  }

  useEffect(() =>{
    getProducts();
  },[])

  let Product;
  const addtocart =(product)=>{
    if (uid!=null){
      // console.log(product)
      Product=product;
      Product["qty"]= 1;
      Product["totalprice"]= Product.qty * Product.price;
      fs.collection('cart' + uid).doc(product.Id).set(Product).then(()=>{
        console.log('first')
      })

    }
    else{
      navigate('/login');
      
    }
  
  }

    return (
    <>
        {/* <Navbar user={user}/> */}
       <div className='hero'>
         <h1>Happy Shopping!!</h1>
       </div>
        {products.length >0 && (
          <div className='container-fluid home-background'>
            <h2 className='text-center heading'>All Products</h2>
            <div className='container-fluid productList'>
              <Products products={products} addtocart={addtocart}/>
            </div>
            </div>
          
        )}
        {products.length <1 && (
          <div className='container-fluid'>
            <div className='text-center'> No products to display </div>
          </div>
        )}
    </>
  )
}

export default Home