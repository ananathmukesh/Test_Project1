import React from 'react'
import { Typography, AppBar } from '@mui/material'
import VideoPlayer from '../components/videoplayer/videoPlayer.component'
import Options from '../components/options/options.component'
import Notifications from '../components/notifications/notifications.component'
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: '0 100px 30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));
const SocketVideo = () => {
  const classes = useStyles()
  const location = useLocation();
  const { 
    callingid,
    callingname
         } = location.state || {};

  console.log(location);
  return (
    <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="success">
            <Typography variant="h2" align="center">
                Video Call
            </Typography>
        </AppBar>
            <VideoPlayer />
            <Options callingid={callingid} callingname={callingname}>
              <Notifications />
            </Options>
    </div>
  )
}

export default SocketVideo