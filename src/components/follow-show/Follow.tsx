import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../database/firebase.config';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { User } from 'firebase/auth';

const Comment = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleFollowClick = async () => {
    if (user) {
      try {
        const userRef = collection(firestore, "User");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const userId = doc.id;
          const userTableRef = collection(firestore, 'User', userId, 'follow');
          
          // Add a document with "follow: true" to the 'follow' subcollection
          await addDoc(userTableRef, {
            follow: true,
          });

          console.log("Série ajoutée!");
        });
      } catch (error) {
        console.error("Erreur lors du suivi de la série : ", error);
      }
    } else {
      console.log("L'utilisateur n'est pas connecté. Vous devez être connecté pour suivre une série.");
    }
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>Suivre Série</h1>
            <button className='RL-button' onClick={handleFollowClick}>
              Envoyer
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Comment;
