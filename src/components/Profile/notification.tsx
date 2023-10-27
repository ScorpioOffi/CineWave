import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../database/firebase.config';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const Notif = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const notiftrue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user && notification) {
      try {
        const userRef = collection(firestore, "User");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const userId = doc.id;

          await updateDoc(doc.ref, {
            notification: true,
          });
        });

        console.log("Notifications activées");
        setNotification('');
      } catch (error: any) {
        console.error("Erreur lors de l'ajout des notifications : ", error);
      }
    } else {
      console.log("L'utilisateur n'est pas connecté. Vous devez être connecté pour ajouter les notifications.");
    }
  };

  return (
    <div>
      <h2 className='text'>Souhaitez-vous être notifié ?</h2>
      <form onSubmit={notiftrue}>
        <label>
          <input 
          className='notif'
            type="radio"
            name="notification"
            value="1"
            checked={notification === '1'}
            onChange={() => setNotification('1')}
          />
          Oui
        </label>
        <label>
          <input
            type="radio"
            name="notification"
            value="2"
            checked={notification === '2'}
            onChange={() => setNotification('2')}
          />
          Non
        </label>
        <button className='button' type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}

export default Notif;
