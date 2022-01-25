import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import MoreVert from '@material-ui/icons/MoreVert';
import Back from '@material-ui/icons/ArrowBack';
import AttachIcon from '@material-ui/icons/AttachFile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import { getParthner } from '../../utils/getParthner';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, where, doc } from 'firebase/firestore';
import ChatField from './ChatField';
import ChatForm from './ChatForm';
import { getLastActivity, getMessageTime } from '../../utils/datefns';

const Chat = ({ chat, messages }) => {
   const router = useRouter();
   const [parthner, setParthner] = useState(null)
   const [clientMessages, setClientMessages] = useState(null)
   const [email, setEmail] = useState(null)
   const [user] = useAuthState(auth);
   const [info] = useCollection(email && query(collection(db, 'users'), where('email', '==', email)))
   const [msgsSnapshot] = useCollection(chat &&
      query(collection(doc(db, 'chats', router.query.id), 'messages'), orderBy('createdAt', 'asc')))

   useEffect(() => {
      if (chat && user?.email) {
         const prt = getParthner(chat.users, user.email)

         setEmail(prt)
      }
   }, [chat, user])

   useEffect(() => {
      if (info) {
         setParthner(info.docs[0].data())
      }
   }, [info])

   const showChatField = () => {
      if (msgsSnapshot && !msgsSnapshot?.metadata.hasPendingWrites) {
         const clientMsgs = msgsSnapshot.docs.map(msg => {
            const message = msg.data();

            return {
               ...message,
               id: msg.id,
               createdAt: getMessageTime(message.createdAt.toDate())
            }
         })

         return setClientMessages(clientMsgs);
      } else {
         return setClientMessages(messages);
      }
   }

   useEffect(() => {
      showChatField()
   }, [msgsSnapshot, messages])

   const handleBack = () => {
      router.back()
   }

   return <Container>
      <Header>
         <HeaderContent>
            <BackIcon onClick={handleBack} />
            <HeaderInfo>
               {parthner
                  && <>
                     <UserAvatar src={parthner.photo} />
                     <UserInfo>
                        <UserEmail>
                           {parthner.email}
                        </UserEmail>
                        <LastSeen>
                           {getLastActivity(parthner.lastSeen.toDate())}
                        </LastSeen>
                     </UserInfo>
                  </>}
            </HeaderInfo>
            <HeaderIcons>
               <IconButton>
                  <AttachIcon />
               </IconButton>
               <IconButton>
                  <MoreVert />
               </IconButton>
            </HeaderIcons>
         </HeaderContent>
      </Header>
      <ChatField messages={clientMessages} user={user} />
      <ChatForm user={user} chat={chat} />
   </Container>;
};

export default Chat;

const Container = styled.div`
   background-color: #f1f1f1;
   flex: 1 1 auto;
   position: relative;
   display: flex;
   flex-direction: column;
`

const BackIcon = styled(Back)`
   font-size: 1.25rem;
   margin-right: 0.625rem;
   cursor: pointer;
`

const Header = styled.div`
   height: 80px;
   padding: 0rem 1.725rem;
   background-color: #fff;
   position: sticky;
   top: 0;
   border-bottom: 1px solid whitesmoke;
   display: flex;
   align-items: center;
`

const HeaderContent = styled.div`
   display: flex;
   align-items: center;
   flex: 1 1 auto;
`

const HeaderInfo = styled.div`
   flex: 1 1 auto;
   display: flex;
`

const HeaderIcons = styled.div`
   display: flex;
   align-items: center;
   gap: 0.375rem;
`
const UserInfo = styled.div`
`

const UserEmail = styled.div`
   line-height: 1.5rem;
   font-size: 1.125rem;
`
const UserAvatar = styled(Avatar)`
   margin-right: 0.75rem;
   box-shadow: var(--shadow-avatar);
`

const LastSeen = styled.div`
   font-weight: 300;
   font-size: 0.875rem;
   color: #b9b9b9;
`
