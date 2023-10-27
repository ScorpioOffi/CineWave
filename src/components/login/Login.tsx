import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../database/firebase.config';
import { NavLink, useNavigate } from 'react-router-dom'
import './../../css/Register&Login.css'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/accueil")
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
     <main className='RL'>  
                <section className="form-container">
                    <div className ="lol">                  
                        <h1 className='RL-h1'> Login </h1>
                        <form>                                              
                            <div>
                                
                                <input
                                    className='RL-input'
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
                                    className='RL-input'
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <p className="account">
                                No account yet? {' '}
                                <NavLink to="/" className="sign-link">
                                      Sign up
                                </NavLink>
                        </p>   

                            <div>
                                <button  className='RL-button'
                                    onClick={onLogin}
                                >
                                    LOGIN
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <img className="image-RL" src="./assets/image.png" alt="image" />
            </main>
        </>
    )
}
 
export default Login