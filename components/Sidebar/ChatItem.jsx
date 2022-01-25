import React, { useEffect, useState } from 'react';
import { getParthner } from '../../utils/getParthner';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

const ChatItem = ({ users, me, id }) => {
   const [email, setEmail] = useState(null);
   const [info, setInfo] = useState(null);
   const [parthner] = useCollection(query(collection(db, 'users'), where('email', '==', email)));

   useEffect(() => {
      if (parthner) {
         const user = parthner.docs[0].data();

         if (user) setInfo(user);
      }

   }, [parthner])

   useEffect(() => {
      const parthner = getParthner(users, me.email);
      setEmail(parthner)
   }, [users])

   return (
      <>
         {info
            && <Link href={`/chat/${id}`}>
               <Container>
                  <Avatar src={info.photo} />
                  <Email>
                     {info.email}
                  </Email>
               </Container>
            </Link>}
      </>
   );
};

export default ChatItem;

const Container = styled.div`
   display: flex;
   align-items: center;
   gap: 0.625rem;
   padding: 1rem;
   cursor: pointer;  

   :hover {
      background-color: #f3f3f3;
   }
`

const Email = styled.div`
   font-weight: 500;
`

