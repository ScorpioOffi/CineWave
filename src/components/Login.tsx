import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../database/firebase.config';
import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert("Mot de passe ou email incorrect");
        });
       
    }
 
    return(
        <>
            <main >        
            <section className="form-container">
                 <div className ="lol">                  
                 <h1 className='h1'> Login </h1>                                                                            
                                                       
                        <form onClick={onLogin}>                                              
                            <div>
                                
                                <input
                                    className='input'
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                              
                                <input
                                    className='input'
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    LOGIN                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
                <img className="image-container" src="./assets/image.png" alt="image" />  

            </main>
        </>
    )
}
 
export default Login