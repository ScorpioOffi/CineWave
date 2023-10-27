import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../database/firebase.config';
import { addDoc, collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';
import Rate from './Rate';

const Comment = () => {
  const [commentaire, setCommentaire] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState([] as any[]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    loadComments();
  }, []);

  const loadComments = async () => {
    if (user) {
      try {
        const q = query(collection(firestore, "User"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const commentsArray: React.SetStateAction<any[]> = [];
          querySnapshot.forEach(async (doc) => {
            const userId = doc.id;
            const userTableRef = collection(firestore, 'User', userId, 'comments');
            const commentsQuerySnapshot = await getDocs(userTableRef);
  
            commentsQuerySnapshot.forEach((commentDoc) => {
              const commentData = commentDoc.data();
              commentsArray.push(commentData);
            });
          });
  
          console.log("Comments Array: ", commentsArray); 
          setComments(commentsArray);
        } else {
          console.log("Aucun utilisateur correspondant à l'e-mail n'a été trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires : ", error);
      }
    }
  };
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      try {
        const userRef = collection(firestore, "User");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          const userDoc = doc.data();

          const userId = doc.id;
          const userTableRef = collection(firestore, 'User', userId, 'comments');
          await addDoc(userTableRef, {
            comment: commentaire,
          });
        });

        console.log("Commentaire ajouté.");
        loadComments();
      } catch (error: any) {
        console.error("Erreur lors de l'ajout du commentaire : ", error);
      }
    } else {
      console.log("L'utilisateur n'est pas connecté. Vous devez être connecté pour ajouter un commentaire.");
    }
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <h1>Commentaires</h1>
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  required
                  placeholder="Commentaire"
                />
              </div>
              < Rate />
              <button className='RL-button' type="submit">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* <section>
        
        <h2>Commentaires existants :</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </ul>
      </section> */}
    </main>
  );
};

export default Comment;
