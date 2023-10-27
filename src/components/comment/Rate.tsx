import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../database/firebase.config';
import { addDoc, collection, query, where, getDocs, DocumentData, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';


const Rate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const rate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user && note) {
      try {
        const userRef = collection(firestore, "User");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const userId = doc.id;

          await updateDoc(doc.ref, {
            note: note,
          });
        });

        console.log("Note ajoutée");
        setNote('');
      } catch (error: any) {
        console.error("Erreur lors de l'ajout de la note : ", error);
      }
    } else {
      console.log("L'utilisateur n'est pas connecté. Vous devez être connecté pour ajouter une note.");
    }
  };

  return (
    <main>
      <section>
      <div>
     

            <h1>Choisissez une note :</h1>
            <form onSubmit={rate}>
                <label>
                  <input
                    type="radio"
                    name="note"
                    value="1"
                    checked={note === '1'}
                    onChange={() => setNote('1')}
                  />
                  ☆
                </label>
                <label>
                  <input
                    type="radio"
                    name="note"
                    value="2"
                    checked={note === '2'}
                    onChange={() => setNote('2')}
                  />
                   ☆
                </label>
                <label>
                  <input
                    type="radio"
                    name="note"
                    value="3"
                    checked={note === '3'}
                    onChange={() => setNote('3')}
                  />
                    ☆
                </label>
                <label>
                  <input
                    type="radio"
                    name="note"
                    value="4"
                    checked={note === '4'}
                    onChange={() => setNote('4')}
                  />
                   ☆
                </label>
                <label>
                  <input
                    type="radio"
                    name="note"
                    value="5"
                    checked={note === '5'}
                    onChange={() => setNote('5')}
                  />
                 ☆
                </label>
                
              </form>
              <button className='CR-button' type="submit">
                Envoyer
              </button>
              </div>
            
      </section>
      {/* <section>
        <p>Votre note : {note}</p>
      </section> */}
    </main>
  );
};



export default Rate;
