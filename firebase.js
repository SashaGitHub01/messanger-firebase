import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc, serverTimestamp, addDoc, getDoc } from 'firebase/firestore';
import { UserDto } from './dtos/UserDto';

const firebaseConfig = {
   apiKey: "AIzaSyD8gEP6tvr1BF3oYqbWs3OQZX1xlzCURv0",
   authDomain: "whatsapp-cf912.firebaseapp.com",
   projectId: "whatsapp-cf912",
   storageBucket: "whatsapp-cf912.appspot.com",
   messagingSenderId: "1022039985942",
   appId: "1:1022039985942:web:0961fa084d1bffbccdca37"
};

const app = !firebase.apps.length
   ? firebase.initializeApp(firebaseConfig)
   : firebase.app();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const googleSignIn = (auth, prov) => signInWithPopup(auth, prov);


export const addUser = (data) => {
   const user = new UserDto({
      ...data,
      lastSeen: serverTimestamp()
   })

   setDoc(doc(db, 'users', user.id),
      { ...user },
      { merge: true })
}

export const createMessage = async (id, content) => {
   const chatRef = doc(collection(db, 'chats'), id);

   await addDoc(collection(chatRef, 'messages'), {
      ...content,
      createdAt: serverTimestamp()
   })
}