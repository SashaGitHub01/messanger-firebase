import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatField = ({ messages, user }) => {
   const ref = useRef(null);

   useEffect(() => {
      if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' })
   }, [messages])

   return <Container>
      {messages && messages.map(msg => {
         const isOwner = user?.email === msg.user.email;
         return <Message
            key={msg.id}
            isOwner={isOwner}
            message={msg}
            scrollRef={ref}
         />
      })}
   </Container>;
};

export default ChatField;

const Container = styled.div`
   flex: 1 1 auto;
   display: flex;
   flex-direction: column;
   gap: 1.5rem;
   padding: 1rem 1.25rem;
   overflow: auto;
`