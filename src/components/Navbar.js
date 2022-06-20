import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { auth, fs } from '../firebase'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

const Navbar = () => {
   //getting current user function
   function GetCurrentUser(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('users').doc(user.uid).get().then(snapshot=>{
              setUser(snapshot.data().Name);
            })
        }
        else{
          setUser(null);
        }
      })
    }, [])
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);
  const navigate =useNavigate();

  const handleLogout= () =>{
    auth.signOut().then(()=>{
      navigate('/login');
    })
  }

  // for badge icon
  
    const [badge, setBadge] = useState();
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
            fs.collection('cart' + user.uid).onSnapshot(snapshot=>{
              const num= snapshot.docs.length;
              setBadge(num)
            })
            
        }
      })
    }, [])
  
   
  return (
    <div className='navbar fixed-top align-items-center'>
        <div className='container d-flex justify-content-between align-items-center p-1'>
           <Link to="/"><img src="../../images/logo.svg" style={{width: '50px'}}/></Link> 
           {!user&&
             <div>
                <Link to="/signup" className='nav-title'>Sign Up</Link>
                <Link to="/login" className='nav-title'>Login</Link>
            </div>
           }
               
            {user&&<>
              <div className='d-flex align-items-center'>
              <h6 className='nav-text'>Hello! {user}</h6>
              <Link to='/cart'><Badge badgeContent={badge} color="primary"><ShoppingCartIcon style={{color:"white"}} fontSize='large'/></Badge></Link>
             <div className='btn' style={{color: "white"}} onClick={handleLogout}>Logout</div>
              </div>
            
            </>}
        </div>
    </div>
  )
}

export default Navbar