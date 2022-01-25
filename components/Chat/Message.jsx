import React from 'react';
import styled from 'styled-components';

const Message = ({ isOwner, message, scrollRef }) => {
   return <Container isOwner={isOwner}>
      <MessageContainer isOwner={isOwner} ref={scrollRef}>
         <Content>
            {message.content}
         </Content>
         <Time>
            {message.createdAt}
         </Time>
      </MessageContainer>
   </Container>;
};

export default Message;


const MessageContainer = styled.div`
   background-color: ${({ isOwner }) => isOwner ? '#c8ffbc' : '#ffff'};
   display: flex;
   padding: 0.5rem 0.75rem;
   max-width: 70%;
   border-radius: 0.375rem;
   flex-direction: column;
   min-width: 60px;
`

const Container = styled.div`
   display: flex;
   justify-content: ${({ isOwner }) => isOwner ? 'flex-end' : 'flex-start'};
   align-items: center;
`

const Content = styled.div`
  line-height: 1.25rem;
`

const Time = styled.div`
  font-size: 0.625rem;
  color:#6d6d6d;
  text-align: right;
  line-height: 1rem;
`