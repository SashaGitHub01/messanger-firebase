import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';
import { db } from '../../firebase';
import Head from 'next/head';
import { getMessageTime } from '../../utils/datefns';

const ChatPage = ({ chat, messages }) => {

   return (
      <>
         <Head>
            <title>Chat</title>
         </Head>
         <Container>
            <Sidebar />
            <Chat chat={chat} messages={messages} />
         </Container>
      </>
   )
};

export default ChatPage;

export const getServerSideProps = async (ctx) => {
   const id = ctx.query.id;
   const ref = doc(db, 'chats', id);
   const msgsDoc = await getDocs(query(collection(ref, 'messages'), orderBy('createdAt', 'asc')));
   const messages = msgsDoc.docs.map(msg => {
      const message = msg.data();

      return {
         ...message,
         id: msg.id,
         createdAt: getMessageTime(message.createdAt.toDate())
      }
   })

   const chat = await getDoc(ref);

   return {
      props: {
         chat: {
            id: chat.id,
            ...chat.data()
         },

         messages: messages
      }
   }
}

const Container = styled.div`
   width: 100%;
   display: flex;
   max-height: 100vh;
`