import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, addUser } from '../firebase';
import Login from './login';
import { useEffect } from 'react';
import Loader from '../components/Loader';

function MyApp({ Component, pageProps }) {
   const [user, loading] = useAuthState(auth)

   useEffect(() => {
      if (user) {
         addUser(user);
      }
   }, [user])

   if (loading) return <Loader />

   if (!user) return <Login />

   return (
      <Component {...pageProps} />
   )
}

export default MyApp
