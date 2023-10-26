import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../database/firebase.config';
import './../../css/Register&Login.css'

const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
 
   
    }
 
  return (
    
    <main>  
              
       <section className="form-container">
            <div>
                <div className ="lol">                  
                    <h1 className='RL-h1'> Register </h1>                                                                            
             <form onSubmit={onSubmit}>
                   <div >
                            
                            <input
                                className='RL-input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email"                                
                            />
                        </div>

                        <div>
                            <input
                                className='RL-input'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>  
                        <p className="account">
                        Already have an account?{' '}
                        <NavLink to="/login" className="sign-link"  >
                            Sign in
                        </NavLink>
                    </p>                                            
                        
                        <button className='RL-button'
                        
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                        SIGN UP
                        </button>
                                                                     
                    </form>
                   
                                    
                </div>
            </div>
        </section>
        <img className="image-RL" src="./assets/image.png" alt="image" />  
    </main>
  )
}
 
export default Signup