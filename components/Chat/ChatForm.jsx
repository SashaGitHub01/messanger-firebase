import React from 'react';
import styled from 'styled-components';
import Smile from '@material-ui/icons/SentimentSatisfiedAlt';
import { useFormik } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import { createMessage } from '../../firebase';
import { serverTimestamp } from 'firebase/firestore';

const ChatForm = ({ user, chat }) => {
   const validate = Yup.object().shape({
      content: Yup.string().required()
   })

   const formik = useFormik({
      initialValues: {
         content: '',
      },

      onSubmit: async (vals, helpers) => {
         createMessage(chat.id, {
            ...vals,
            user: {
               email: user.email,
               photo: user.photoURL
            },
            createdAt: serverTimestamp()
         })

         helpers.resetForm();
      },

      validationSchema: validate
   })

   return (
      <Form onSubmit={formik.handleSubmit}>
         <Container>
            <TextareaCont>
               <SmileIcon />
               <Textarea
                  onChange={formik.handleChange}
                  name='content'
                  value={formik.values.content}
               />
            </TextareaCont>
            {formik.isValid && formik.dirty
               && <Button
                  type='submit'
                  color='primary'
                  variant='contained'
               >
                  SEND
               </Button>}
         </Container>
      </Form>
   );
};

export default ChatForm;


const Form = styled.form`
   padding: 1rem;
   background-color: #fff;
   position: sticky;
   bottom: 0;
`

const SmileIcon = styled(Smile)`
   color:#b9b9b9;
   cursor: pointer;
   margin-right: 0.75rem;
`

const Container = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
`

const TextareaCont = styled.div`
   display: flex;
   align-items: center;
   flex: 1 1 auto;
`

const Textarea = styled.textarea`
   width: 100%;
   background-color: whitesmoke;
   resize: none;
   border-radius: 5px;
   padding: 0.5rem 0.875rem;
   font-size: 0.875rem;
   line-height: 1.125rem;
   margin-right: 0.5rem;
`