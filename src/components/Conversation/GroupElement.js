import React from 'react'
import { useTheme } from "@mui/material/styles";
import { Box,Stack,Avatar,Typography,Badge } from '@mui/material';


const GroupElement = ({ group_img,COUNTINFG,group_name,groupmaster_id }) => {

    const theme = useTheme();
 console.log('group list',group_img);

  return (
    <Box sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light'? "#fff" : theme.palette.background.default,
        color: theme.palette.mode === 'light'? "#000" : "#fff"
      }}
        p={2}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'  style={{
          width:"228px"
        }}>
          <Stack direction='row' spacing={2}>
          <Avatar src={group_img} />
            
            <Stack spacing={0.3}>
              <Typography variant='subtitle2'>
                {group_name}
              </Typography>
              <Typography variant='caption'>
                hi good morning everyone
              </Typography>
            </Stack>
            </Stack>
            <Stack spacing={2} alignItems='center'>
              <Typography sx={{fontWeight:600}} variant='caption'>
                12:30 am
              </Typography>
              <Badge color='primary' badgeContent={0}>
  
              </Badge>
            </Stack>
          
          
        </Stack>
  
  
      </Box>
  )
}

export default GroupElement
