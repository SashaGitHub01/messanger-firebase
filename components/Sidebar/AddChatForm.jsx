import React from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, } from 'firebase/firestore';
import { db } from '../../firebase';
import { isChatExist } from '../../utils/isChatExist';

const AddChatForm = ({ user, myChats, handleClose }) => {
   const validate = Yup.object().shape({
      email: Yup.string().email().required()
   })

   const formik = useFormik({
      validationSchema: validate,

      initialValues: {
         email: ''
      },

      onSubmit: async (vals, helpers) => {
         if (isChatExist(myChats, vals.email)) {
            helpers.setFieldError('email', 'Chat already exists')
            return;
         };

         await addDoc(collection(db, 'chats'), { users: [user.email, vals.email] });
         handleClose();
      }
   })

   return (
      <Form onSubmit={formik.handleSubmit}>
         <Title>
            Create new chat
         </Title>
         <InputCont>
            <Input
               variant='outlined'
               label='Parthner email'
               error={!!formik.errors.email}
               name='email'
               onChange={formik.handleChange}
            />
         </InputCont>
         <Footer>
            <Button
               variant='contained'
               color='primary'
               disabled={formik.isSubmitting}
               type='submit'
            >
               CREATE
            </Button>
         </Footer>
      </Form>
   );
};

export default AddChatForm;

const Form = styled.form`

`

const Input = styled(TextField)`
   width: 100%;
`

const InputCont = styled.div`
   padding: 1.25rem 0;
`

const Title = styled.div`
font-weight: 500;
font-size: 1.2rem;
text-align: center;
`

const Footer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
`