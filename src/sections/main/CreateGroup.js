import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { multiple } from './../../components/Conversation/MsgTypes';
import axios from 'axios';
import { useEffect } from 'react';
import { serverUrl } from '../../config/ServerUrl';
import ChatElement from '../../components/ChatElement';
import GroupChatElement from '../../components/GroupChatlist';

const MEMBERS = ['Name 1', 'Name 2', 'Name 3' ];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CreateGroupForm = ({handleClose}) =>{


  const [data,setData] = useState([]);

  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    members: Yup.array().min(2, 'Must have at least 2 members')
  });

  const defaultValues = {
    title:'',
    members:[]
  }

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues
  });

  const {reset, watch, setError, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful, isValid}}
   = methods;

   const onSubmit = async (data) => {
    try {
      //api call
      console.log('Data',data);
    } catch (error) {
      console.log(error);
    }
   };


   useEffect(() => {
    const fetchData = async () => {
      try {
        var authData = JSON.parse(window.localStorage.getItem("auth"));

        const listdetails = {
          id: authData.user.id,
          receiver_id: '',
        };

        const response = await axios.post(`${serverUrl}/chatlist`, listdetails);
        setData(response.data.data.chatlist);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
   }, [])
   


   return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
         {
          data.map((el)=>(
            <GroupChatElement
               key={el.id}
               {...el}
               datas={el}
            />
          ))
         }
        <Stack spacing={2} direction='row' alignItems='center' justifyContent='end'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Add Group
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
   )
};

const CreateGroup = ({open, handleClose}) => {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} TransitionComponent={Transition} keepMounted sx={{p:4}}>
        {/* Title */}
        <DialogTitle sx={{mb:3}}>Create New Group</DialogTitle>
        {/* Content */}
        <DialogContent>
          {/* Form */}
          <CreateGroupForm handleClose/>
        </DialogContent>
    </Dialog>
  )
}

export default CreateGroup