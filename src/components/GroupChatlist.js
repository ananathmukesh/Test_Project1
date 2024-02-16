import { Avatar, Badge, Box, Stack, Typography, Checkbox } from '@mui/material';
import {useTheme , styled} from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { useState } from 'react';

//single chat element
const GroupChatElement = ({id,name, img, msg, time,online, unread, onClick, profilepic,setSearchTerm,searchTerm,datas}) => {

   const [senderid,setSenderid] = useState(null);

    const theme = useTheme();

    const handleClick = (e) => {
      e.preventDefault();
      // Call the onClick prop with the id and event
      onClick(id, e);
      
      setSenderid(id);
    };
  
   
    return (
        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default,
            color: theme.palette.mode === 'light' ? "#000" : "#fff"
          }} p={2}>
            <Stack direction="row" alignItems='center' justifyContent='space-between' onClick={handleClick} style={{ width: "228px" }}>
              <Stack direction='row' spacing={2}>
                <Avatar src={img} />
                <Stack spacing={0.3}>
                  <Typography variant='subtitle2'>
                    {name}
                  </Typography>
                  <Typography variant='caption'>
                    Don't Disturb Me
                  </Typography>
                </Stack>
                {/* Add Checkbox component here */}
                <Stack style={{
                    alignContent:"center",
                    textAlign:"center"
                }}>
                <Checkbox />
                </Stack>
              </Stack>
            </Stack>
          </Box>
    )
  };

  export default GroupChatElement