import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth';
import { auth, firestore } from '../../database/firebase.config';
import './../../css/Register&Login.css'
import { addDoc, collection } from 'firebase/firestore';

const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            console.log("Compte créé avec succès. Veuillez vérifier votre e-mail.");
            navigate("/login");
            const docRef = await addDoc(collection(firestore, "User"), {
                email: email,
                password: password,
              });
              console.log("Document written with ID: ", docRef.id);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erreur lors de la création du compte : ", errorCode, errorMessage);
        }
    };
 
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