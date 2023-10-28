import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../../database/firebase.config';

const ButtonFollow = ({ serieDetails }: { serieDetails: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [follow, setFollow] = useState(localStorage.getItem('followed-' + serieDetails.id) === 'true');

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleFollowClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user && serieDetails && !follow) {
      try {
        const userRef = collection(firestore, "User");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const userId = doc.id;

          await updateDoc(doc.ref, {
            follow: true,
            idSerie: serieDetails
          });
        });

        localStorage.setItem('followed-' + serieDetails.id, 'true');
        setFollow(true);
        console.log("Série suivie");
      } catch (error: any) {
        console.error("Erreur lors de l'ajout de la série : ", error);
      }
    } else if (!user) {
      console.log("L'utilisateur n'est pas connecté. Vous devez être connecté pour ajouter une série.");
    } else if (follow) {
      localStorage.removeItem('followed-' + serieDetails.id);
      setFollow(false);
      console.log("Vous ne suivez plus cette série.");
    }
  };

  return (
    <div>
      <button onClick={handleFollowClick} disabled={follow}>
        {follow ? "Suivi" : "Suivre"}
      </button>
    </div>
  );
};

export default ButtonFollow;
