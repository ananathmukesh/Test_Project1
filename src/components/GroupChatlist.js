import { Avatar, Badge, Box, Stack, Typography, Checkbox } from '@mui/material';
import {useTheme , styled} from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { useState } from 'react';
import BasicTable from '../utils/Table';
import { useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../config/ServerUrl';
import HorizontalLinearStepper from '../utils/Stepper';
//single chat element
const GroupChatElement = ({setOpenDialog,setData}) => {

    const [senderid,setSenderid] = useState(null);
    const [data, setData1] = useState([]);
 
    const [arr, setArr] = useState([]);
 
 
     const theme = useTheme();
 
    useEffect(() => {
     const fetchData = async () => {
         try {
           var authData = JSON.parse(window.localStorage.getItem("auth"));
   
           const listdetails = {
             id: authData.user.id,
             receiver_id: '',
           };
   
           const response = await axios.post(`${serverUrl}/chatlist`, listdetails);
           setData1(response.data.data.chatlist);
           
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };
   
       fetchData();
    }, [])


    const inputStyle = {
        width: '250px',
        height: '32px',
        background: '#fcfcfc',
        border: '1px solid #aaa',
        borderRadius: '5px',
        boxShadow: '0 0 3px #ccc, 0 10px 15px #ebebeb inset',
        textIndent: '32px'
      };

      const myFunction = (inputCB) => {
        // Check if the checkbox is checked
        if (inputCB.checked) {
          // If checked, add the ID to the array
          setArr(prevArr => [...prevArr, inputCB.id]);
        } else {
          // If unchecked, remove the ID from the array
          setArr(prevArr => prevArr.filter(id => id !== inputCB.id));
        }
      };

      console.log(arr);
   
    return (
        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default,
            color: theme.palette.mode === 'light' ? "#000" : "#fff"
          }} p={2}>
          {/* <table>
           
            <tbody>
            {
                data.map((el)=>(
                    <tr>
                   <td>
                   <input
  type="checkbox"
  id={el.id}
  onChange={(e) => myFunction(e.target)}
  style={{ width: '20px', height: '20px' }}
/>
                   </td>
                    <td><Avatar src={el.img} /></td>
                    
                    <td><Typography variant='subtitle2' style={{
                        marginLeft:"10px"
                    }}>
                    {el.name}
                  </Typography></td>
                  
                </tr>
                ))
            }
                
            </tbody>
          </table> */}
          <HorizontalLinearStepper dataval={data} myFunction={myFunction} arr={arr} setArr={setArr} setOpenDialog={setOpenDialog}/>
          </Box>
    )
  };

  export default GroupChatElement