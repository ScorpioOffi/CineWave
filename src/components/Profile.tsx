import React, { useState, useEffect } from 'react';
import { auth } from '../database/firebase.config';
import { updateEmail, updatePassword } from 'firebase/auth';

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
            <h1>Profil de l'utilisateur</h1>
            <p>Adresse e-mail : {userEmail}</p>
            
            <h2>Modifier l'adresse e-mail</h2>
            <input
                type="email"
                placeholder="Nouvelle adresse e-mail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <button onClick={handleUpdateEmail}>Modifier l'adresse e-mail</button>
            
            <h2>Modifier le mot de passe</h2>
            <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleUpdatePassword}>Modifier le mot de passe</button>
        </div>
    );
}

export default Profile;
