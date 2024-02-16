import { Box, Stack, TextField,IconButton } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  TimeLine,
  Video,
  Audio,
  ForwardMsg,
  TextWithEmojiMsg,
  CallRequest,
  AudioCallRequest
} from "./MsgTypes";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Close } from '@mui/icons-material'; // Import the close icon component
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import { chatserverUrl } from "../../config/ServerUrl";
import { PacmanLoader } from 'react-spinners';
import EmojiPicker1 from "../../utils/emojipickler1";
import { AiOutlineClose } from 'react-icons/ai'; // Replace with the correct close icon
import Notifications from "../notifications/notifications.component";
import Options from "../options/options.component";
import VideoPlayer from "../videoplayer/videoPlayer.component";
import Loader from "../../utils/loader";


const Message = ({
  menu,
  senderid,
  receiverid,
  chathistory,
  handelmaindelete,
  ReplyMsgs,
  getemoj,
  closeEmoji,
  searchTerm,
  handlestar,
  star,
  setStar,
  handleUnstar,
  openModal,
  openModalImg,
  handelModelClose,
  handleModelImage,
  setInputValue,
  editModel,
  handleEdit,
  EditData,
  closeEditdata,
  openContactlist,
  OpenContact,
  data,
  closeContactlist,
  Downarrow,
  handleDownarrow,
  OpenReplyModel,
  Replydata,
  checkboxStates,
  handleCheckboxChange,
  LoaderOn,
  setLoaderOn,
  closeReplydata,
  addEmoji,
  showEmoji,
  setOpenAction,
  setCallersData,
  openAudioCall,
  setOffscroolbar
}) => {



  
  const [userid, setUsername] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData) {
      // Use the retrieved data as needed
      setUsername(authData.user.id);
    }

    const getTimeline = async () => {
      const gettimelines = await axios.post(
        `${chatserverUrl}/TimeLine`
      );
      setTimeline(gettimelines.data.data.message);
      
    };

    getTimeline();
  }, []);

 



  console.log(chathistory);



  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    let currentDate = null;

    messages.forEach((el) => {
      const messageDate = new Date(el.date_added).toDateString();
   
      if (messageDate !== currentDate) {
        groupedMessages.push({ type: 'divider', date: messageDate });
        currentDate = messageDate;
      }

      groupedMessages.push(el);
    });

    return groupedMessages;
  };

  const groupedChathistory = groupMessagesByDate(chathistory);






  return (
    <>
     

<Box p={3} style={{
      height:"100vh",
    }}>
   
      <Stack spacing={3} >
      
        {/* {

  timeline.map((date)=>(
    <h1>{date.date_added}</h1>
    
  ))
} */}

{groupedChathistory.map((el, index) => {
            if (el.type === 'divider') {
              return <TimeLine key={index} el={el} />;
            }

            switch (el.type) {
              case "divider":
                return <TimeLine el={el} />;
  
              case "msg":
                switch (el.subtype) {
                  case "img":
                    return (
                      <MediaMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                        setOffscroolbar={setOffscroolbar}
                      />
                    );
                  case "video":
                    return (
                      <Video
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                        setOffscroolbar={setOffscroolbar}
                      />
                    );
                  case "Audio":
                    return (
                      <Audio
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                    );
                  case "doc":
                    return (
                      <DocMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                    );
  
                  case "link":
                    return (
                      <LinkMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                    );
                  case "reply":
                    return (
                      <ReplyMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                    );
                    case "forward":
                    return (
                      <ForwardMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                    );
                    case "textwithemoji":
                    return (
                      <TextWithEmojiMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                    );
                    case "callRequest":
                    return (
                      <CallRequest
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                        setCallersData={setCallersData}
                      />
                    );
                    case "AudiocallRequest":
                    return (
                      <AudioCallRequest
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                        setCallersData={setCallersData}
                      />
                    );
                  default:
                    return (
                     <div >
                     <TextMsg
                        el={el}
                        menu={menu}
                        searchTerm={searchTerm}
                        setAnchorEls={0}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        getemoj={getemoj}
                        closeEmoji={closeEmoji}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        handleUnstar={handleUnstar}
                        handleEdit={handleEdit}
                        openContactlist={openContactlist}
                        senderid={senderid}
                      />
                     </div>
                    );
                }
                break;
  
              default:
                return <></>;
            }


          })}



      

       
      </Stack>
           
      {showEmoji && (


  <div style={{ position: 'fixed', bottom: '85px', right: '10px' }}>
      {showEmoji && (
        <div>
          <EmojiPicker1 addEmoji={addEmoji} />
          <div style={{ position: 'absolute', top: '0', right: '0', cursor: 'pointer' }}>
            <AiOutlineClose />
          </div>
        </div>
      )}
    </div>
)}




    </Box>

   


{
  openAudioCall === 1 ? (
    <Box>
    <Options>
      <Notifications />
    </Options>
    </Box>
  ) : null
}







    {

      OpenReplyModel === 1 ? (
  <Box
      sx={{
        width: '72%',
        height: 60,
        bottom: 0,
        backgroundColor: '#369ed8',
        position: 'fixed',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '9px',
        marginBottom: '75px',
        borderRadius: '14px',
        transition: 'width 0.3s ease',
      }}
    >
      <div className="message" style={{ marginTop: '15px', marginLeft: '20px' }}>
        {Replydata ? Replydata.message : null}
      </div>

      {/* Close button */}
      <IconButton
        sx={{ position: 'absolute', top: '5px', right: '5px', color: 'white' }}
        onClick={closeReplydata}
      >
        <CloseIcon />
      </IconButton>
    </Box>
) : (
 null 
)
} 




{
  Downarrow === 1 ? (
    <Box
  sx={{
    height: '139px',
    bottom: 0,
    backgroundColor: 'green',
    position: 'fixed',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    right: 0,  // Add this line to position the box on the right
    marginBottom: '0px',
    borderRadius: '14px',
    transition: 'width 0.3s ease',
  }}
>
  {/* Your content */}
  
  {/* Close button */}
  <div
  onClick={handleDownarrow}
  style={{
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'black',
    borderRadius: '50%',
    padding: '5px', // Optional: Adjust padding as needed
  }}
>
  <IconButton
    style={{ color: 'white' }}
    onClick={() => {
      closeContactlist();
    }}
  >
    <KeyboardDoubleArrowDownSharpIcon />
  </IconButton>
</div>

</Box>
  ) : null
}

   


    {


 
      OpenContact === 1 ? (
  <Box
   className='bg-green-500'
      sx={{
        width:"20%",
        height: '239px',
        bottom: 0,

        position: 'fixed',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
       
        marginBottom: '67px',
        borderRadius: '14px',
        transition: 'width 0.3s ease',
      }}
    >
    
    <div className="message" style={{
  marginTop: '15px',
  marginLeft: '20px',
  padding: '20px',
  color: 'black',
  listStyle: 'none',
  fontSize: '20px',
  maxHeight: '300px', // Set your desired max height
  overflow: 'auto', // Enable scrolling
  WebkitOverflowScrolling: 'touch', // Optional: For smoother scrolling on certain browsers
  scrollbarWidth: 'none', // Hide scrollbar in Firefox
  msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
}}>
   {data.map((contact) => (
        <div key={contact.id}>
          <li
            style={{
              color: 'black',
            }}
          >
            <input
              type="checkbox"
              id={`contact-${contact.id}`}
              style={{ width: '20px', height: '20px' }}
              checked={checkboxStates[contact.id] || false}
              onChange={() => handleCheckboxChange(contact.id,contact)}
            />
            <label htmlFor={`contact-${contact.id}`} style={{ marginLeft: '10px' }}>
              {contact.name}
            </label>
          </li>
          <hr style={{ borderTop: '2px solid white', marginBottom: '5px' }}></hr>
        </div>
      ))}
</div>



      {/* Close button */}
      <IconButton
        sx={{ position: 'absolute', top: '5px', right: '5px', color: 'white' }}
        onClick={() => {
          closeContactlist()
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
) : (
 null 
)
}   
   


    {

editModel === 1 ? (
  <Box
      sx={{
        width: '72%',
        height: 60,
        bottom: 0,
        backgroundColor: '#369ed8',
        position: 'fixed',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '9px',
        marginBottom: '75px',
        borderRadius: '14px',
        transition: 'width 0.3s ease',
      }}
    >
      <div className="message" style={{ marginTop: '15px', marginLeft: '20px' }}>
        {EditData ? EditData.message : null}
      </div>

      {/* Close button */}
      <IconButton
        sx={{ position: 'absolute', top: '5px', right: '5px', color: 'white' }}
        onClick={() => {
          closeEditdata() 
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
) : (
 null 
)
} 



    {openModal === 1 ? (
      // Import the close icon component
// ... (your other imports and code)
<Box
  sx={{
    width: 700,
    height: 500,
    bottom: 0,
    backgroundColor: 'white',
    position: 'fixed',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '20px',
    transition: 'width 10s ease',
  }}
>
  {/* Close icon */}
  <Close
    sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      cursor: 'pointer',
    }}
    onClick={() => {
      handelModelClose();
    }}
  />

  <div
    style={{
      backgroundColor: '#007bff',
      height: '40px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Content Viewer
  </div>

  <div
    style={{
      width: '90%',
      marginTop: '20px',
    }}
  >
    {openModalImg && (
      openModalImg.type.startsWith('image/') ? (
        <img
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
          src={URL.createObjectURL(openModalImg)}
          alt="Selected Image"
        />
      ) : openModalImg.type.startsWith('video/') ? (
        <video
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
          controls
        >
          <source src={URL.createObjectURL(openModalImg)} type={openModalImg.type} />
          Your browser does not support the video tag.
        </video>
      ) : openModalImg.type.startsWith('application/pdf') ? (
        <iframe
          src={URL.createObjectURL(openModalImg)}
          width="100%"
          height="300px"
          title="Document Viewer"
        ></iframe>
      ) : (
        // Add more conditions for other document types
        <div>
          Unsupported file type. Cannot preview.
        </div>
      )
    )}
  </div>

  {/* Content of your modal */}
  <div style={{ marginTop: 'auto', width: '80%', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
    <TextField
      onChange={(e) => setInputValue(e.target.value)}
      sx={{
        width: '100%',
        backgroundColor: '#f0f0f0',
      }}
      placeholder="Caption (Optional)"
    />
    <SendIcon style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '45px', fontWeight: 'bold' }} onClick={handleModelImage} />
  </div>

  

</Box>








) : null}



    </>
   
  );
};

export default Message;
