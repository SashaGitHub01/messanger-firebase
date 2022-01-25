import React from 'react';
import styled from 'styled-components';
import ChatItem from './ChatItem';

const ChatsList = ({ chats, me }) => {
   return (
      <Container>
         {chats
            ? chats.map(chat => {
               const users = chat.data().users;

               return <ChatItem key={chat.id} users={users} me={me} id={chat.id} />
            })
            : null}
      </Container>
   );
};

export default ChatsList;

const Container = styled.div`
   
`