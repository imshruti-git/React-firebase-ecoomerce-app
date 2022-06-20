import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, fs } from '../firebase'
import { useNavigate } from 'react-router-dom'
//import { createUserWithEmailAndPassword } from 'firebase/auth'
//import { collection } from 'firebase/firestore'
 
const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errormsg, setErrormsg] = useState('');
    const [successmsg, setSuccessmsg] = useState('');
    
    const handleSignup = (e) => {
        e.preventDefault();
       // console.log(name, email, password)
       //this is an asynchronoms functions that returns a promise which can be either accepted or rejected
       auth.createUserWithEmailAndPassword(email, password)
       //when function is accepted
       .then((credentials) => {
              console.log(credentials);
              fs.collection('users').doc(credentials.user.uid).set({
                     Name: name,
                     Email: email,
                     Password: password
              }).then(() => {
                     setSuccessmsg('Signed up successfully');
                     setName('');
                     setEmail('');
                     setPassword('');
                     setErrormsg('');
                     setTimeout(()=>{
                            setSuccessmsg('');
                            navigate('/login');
                     },3000)
              })
              .catch((error)=>{
                     setErrormsg(error.message)
              })
       })
       //when function is rejected or error
       .catch((error) => {
              setErrormsg(error.message)
       })
    }
  return (
    
            <div className='container mt-5'> 
            <h3>Sign Up</h3>
            <hr/>
            {successmsg&&<>
              <div>{successmsg}</div><br/>
            </>}
            <form className='form-group' onSubmit={handleSignup}>
                <label class="form-label">User name</label>
                <input type="text"
                       class="form-control" 
                       placeholder="John Bays"
                       onChange={(e) => setName(e.target.value)}
                       value={name} />
                <br/>
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
                <h5>Already have an account?  <Link to="/login">Login</Link></h5>
                <button type='submit' className='btn btn-success'>Sign Up</button>
                </div>
             </form>
             {errormsg&&<>
              <br/>
              <div>{errormsg}</div>
            </>}
            </div>
    
  )
}

export default Signup