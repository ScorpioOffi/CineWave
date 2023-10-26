import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthError, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../database/firebase.config';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            console.log("Compte créé avec succès. Veuillez vérifier votre e-mail.");
            navigate("/login");
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Erreur lors de la création du compte : ", errorCode, errorMessage);
        }
    };

    return (
        <main>
            <section>
                <div>
                    <div>
                        <h1> Register </h1>
                        <form>
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={onSubmit}
                            >
                                Sign up
                            </button>
                        </form>

                        <p>
                            Already have an account?{' '}
                            <NavLink to="/login">
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Signup;
