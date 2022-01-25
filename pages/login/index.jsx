import React, { useEffect } from "react";
import styled from "styled-components";
import { FcGoogle } from 'react-icons/fc';
import { Button } from "@material-ui/core";
import { googleSignIn, auth, provider } from "../../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
   const router = useRouter();
   const [user] = useAuthState(auth);

   useEffect(() => {
      if (user) router.push('/')
   }, [user])

   const signIn = () => {
      googleSignIn(auth, provider).catch(err => console.log(err));
   }

   return (
      <LoginCont>
         <LoginWindow>
            <Title>WhatsApp v2</Title>
            <ButtonContainer>
               <SignButton
                  onClick={signIn}
                  startIcon={<FcGoogle />}
                  variant="contained"
                  color='default'
               >
                  Sign in with google
               </SignButton>
            </ButtonContainer>
         </LoginWindow>
      </LoginCont>
   );
};

export default Login;


const LoginCont = styled.div`
   flex: 1 1 auto;
   background-color: rgb(247, 247, 247);
   display: flex;
   align-items: center;
   justify-content: center;
`

const SignButton = styled(Button)`
  &&& { 
     background-color: #fdfdfd;
  }
`

const LoginWindow = styled.div`
   max-width: 350px;
   width: 100%;
   background-color: #fff;
   box-shadow: -2px 5px 6px 1px #0c0c0c1c;
`

const Title = styled.div`
   text-align: center;
   font-size: 1.5rem;
   font-weight: 700;
   padding: 1.5rem 0;
`

const ButtonContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   padding: 2rem 0;
`
