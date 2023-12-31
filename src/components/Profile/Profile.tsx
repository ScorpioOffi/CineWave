import React, { useState, useEffect } from 'react';
import { auth } from '../../database/firebase.config';
import { updateEmail, updatePassword } from 'firebase/auth';
import './Profile.css';
import Notif from './notification';
import Navbar from '../navbar/Navbar';

const Profile = () => {
    const [userEmail, setUserEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email || '');
        }
    }, []);

    const handleUpdateEmail = () => {
        const user = auth.currentUser;
        if (user && newEmail.trim() !== '') {
            updateEmail(user, newEmail)
                .then(() => {
                    setUserEmail(newEmail);
                    setNewEmail('');
                })
                .catch((error) => {
                    console.error(error);
                    alert("Erreur lors de la mise à jour de l'adresse e-mail : " + error.message);
                });
        }
    };

    const handleUpdatePassword = () => {
        const user = auth.currentUser;
        if (user && newPassword.trim() !== '') {
            updatePassword(user, newPassword)
                .then(() => {
                    setNewPassword('');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            < Navbar />
            <img className="image" src="./assets/image.png" alt="image" />  
        <div className='profil'>
            <h1 className='h1'>Profil de l'utilisateur</h1>
            <p className='text'>Adresse e-mail : {userEmail}</p>
            
            <h2 className='text'>Modifier l'adresse e-mail</h2>
            <input
                className='aa'
                type="email"
                placeholder="Nouvelle adresse e-mail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="button" onClick={handleUpdateEmail}>Modifier l'adresse e-mail</button>
            
            <h2 className='text'>Modifier le mot de passe</h2>
            <input
                className='aa'
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className='button' onClick={handleUpdatePassword}>Modifier le mot de passe</button>
            < Notif />
        </div>
        </div>
    );
}

export default Profile;