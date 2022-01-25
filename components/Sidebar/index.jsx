import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import { MdLogout as Logout } from 'react-icons/md'
import SearchIcon from '@material-ui/icons/Search';
import { Button, Modal, Box, Menu, MenuItem } from "@material-ui/core";
import { auth, db } from "../../firebase";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddChatForm from './AddChatForm';
import { collection, where, query } from "firebase/firestore";
import ChatsList from "./ChatsList";
import { useRouter } from "next/router";

const Sidebar = () => {
   const [open, setOpen] = useState(false);
   const [menu, setMenu] = useState(false);

   const [user] = useAuthState(auth);
   const [chats] = useCollection(query(collection(db, 'chats'), where('users', 'array-contains', user.email)));
   const anchor = useRef(null);
   const router = useRouter();

   const logout = () => {
      auth.signOut();
      router.push('/login')
   }

   const handleOpen = () => {
      setOpen(true)
   }

   const openMenu = () => {
      setMenu(true)
   }

   const closeMenu = () => {
      setMenu(false)
   }

   const handleClose = () => {
      setOpen(false)
   }

   return (
      <Container>
         <ModalFlex open={open} onClose={handleClose}>
            <FormContainer>
               <AddChatForm
                  user={user}
                  myChats={chats?.docs}
                  handleClose={handleClose}
               />
            </FormContainer>
         </ModalFlex>
         <Header>
            <AvatarStyled src={user.photoURL} />
            <Icons>
               <IconBtn>
                  <ChatIcon />
               </IconBtn>
               <IconBtn ref={anchor} onClick={openMenu}>
                  <MoreVertIcon />
               </IconBtn>
            </Icons>
         </Header>
         <Search>
            <SearchIconStyled />
            <SearchInput placeholder="Search chat..." />
         </Search>
         <AddButton onClick={handleOpen}>
            START NEW CHAT
         </AddButton>
         <ChatsList chats={chats?.docs} me={user} />
         {anchor.current
            && <Menu
               open={menu}
               getContentAnchorEl={null}
               anchorEl={anchor.current}
               onClose={closeMenu}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
               }}
            >
               <MItem onClick={logout}>
                  <Logout size={'1.2rem'} />
                  <span>Logout</span>
               </MItem>
            </Menu>}
      </Container >
   )
}

export default Sidebar



const MItem = styled(MenuItem)`
   display: flex;
   align-items: center;
   gap: 0.25rem;
`

const AddButton = styled(Button)`
   width: 100%;
   &&& {
      border-bottom: 1px solid whitesmoke;
      border-top: 1px solid whitesmoke;
   }
`

const Container = styled.div`
max-width: 320px;
width: 100%;
background: #ffffff;
min-height: 100vh;
border-right: 1px solid whitesmoke;

::-webkit-scrollbar {
   display: none;
}

-ms-overflow-style: none;
scrollbar-width: none;

`;

const Search = styled.div`
display: flex;
align-items: center;
padding: 1rem;
`;

const SearchIconStyled = styled(SearchIcon)`
   margin-right: 0.375rem;
`

const SearchInput = styled.input`
width: 100%;
font-size: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid whitesmoke;
  height: 80px;
  padding:0 1rem;
  position: sticky;
  z-index: 2;
  top: 0;
  background-color: #fff;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
   gap: 0.5rem;
`;

const AvatarStyled = styled(Avatar)`
   cursor: pointer;
   box-shadow: var(--shadow-avatar);

   :hover {
      opacity: 0.8;
   }
`

const IconBtn = styled(IconButton)`
padding: 0.25rem;
`;

const ModalFlex = styled(Modal)`
   display: flex;
   align-items: center;
   justify-content: center;
`

const FormContainer = styled(Box)`
max-width: 420px;
width: 100%;
background-color: #ffffff;
padding: 1rem 1.5rem;
`