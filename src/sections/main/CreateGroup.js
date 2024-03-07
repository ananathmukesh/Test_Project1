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
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MEMBERS = ['Name 1', 'Name 2', 'Name 3' ];


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CreateGroupForm = ({setOpenDialog}) =>{


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
   

   const inputStyle = {
    width: '367px',
    height: '32px',
    background: '#fcfcfc',
    border: '1px solid #aaa',
    borderRadius: '5px',
    boxShadow: '0 0 3px #ccc, 0 10px 15px #ebebeb inset',
    textIndent: '32px'
  };
  
   return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
     <div className="search" style={{
      display:"flex"
     }}>
      <SearchIcon />
      <input placeholder="Search Users" style={inputStyle} />
    </div>
      <Stack spacing={3}>
      <GroupChatElement setOpenDialog={setOpenDialog} />
        <Stack spacing={2} direction='row' alignItems='center' justifyContent='end'>
         
        </Stack>
      </Stack>
    </FormProvider>
   )
};

const CreateGroup = ({open, handleClose,setOpenDialog}) => {





  return (
    <Dialog fullWidth maxWidth='xs' open={open} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
  {/* Title with Close Icon */}
  <DialogTitle sx={{ mb: 3 }}>
    Create New Group 
    <IconButton
      edge="end"
      color="inherit"
      onClick={()=>setOpenDialog(!open)}
      aria-label="close"
      sx={{ position: 'absolute', right: 0, top: 0,marginRight:'10px',marginTop:"20px" }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  {/* Content */}
  <DialogContent>
    {/* Form */}
    <CreateGroupForm handleClose={handleClose} setOpenDialog={setOpenDialog}/>
  </DialogContent>
</Dialog>
  )
}

export default CreateGroup