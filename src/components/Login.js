import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
// import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errormsg, setErrormsg] = useState('');
    const [successmsg, setSuccessmsg] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(email, password)
        auth.signInWithEmailAndPassword(email, password)
        .then(()=> {
          setSuccessmsg('logged in');
          setEmail('');
          setPassword('');
          setErrormsg('');
          setTimeout(()=>{
                 setSuccessmsg('');
                 navigate('/');
          },3000)
   })
   .catch((error)=>{
    setErrormsg(error.message)
})
    }

  return (
    
    <div className='container mt-5'> 
    <h3>Login</h3>
    <hr/>
    {successmsg&&<>
              <div>{successmsg}</div><br/>
            </>}
    <form className='form-group' onSubmit={handleLogin}>
        <label class="form-label">Email address</label>
        <input type="email" 
               class="form-control" 
               placeholder="name@example.com"
               onChange={(e) => setEmail(e.target.value)}
               value={email} />
        <br/>
        <label class="form-label">Password</label>
        <input type="password" 
               class="form-control"
               onChange={(e) => setPassword(e.target.value)}
               value={password}/>
        <br/>
        <div className='d-flex justify-content-between'>
            <h5>Don't have an account.<Link to="/signup">Sign up</Link></h5>
            <button type='submit' className='btn btn-success'>Login</button>
        </div>
     </form>
     {errormsg&&<>
              <br/>
              <div>{errormsg}</div>
            </>}
    </div>
  
  )
}

export default Login