import React from "react";
// import Chats from "./Chats";
import { Box, Stack, TextField, Fab, InputAdornment } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { IconButton, Button, Divider, Tooltip } from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Header from "../../components/Conversation/Header";
// import Footer from "../../components/Conversation/Footer";
import Message from "../../components/Conversation/Message";
import {
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Camera,
  File,
  Image,
  Sticker,
  User,
  Microphone,
  Check,
} from "phosphor-react";
import { chatserverUrl, serverUrl } from "../../config/ServerUrl";
import { useNavigate } from "react-router-dom";
import StartChat from "../../components/StartChat";
import { Scrollbars } from "react-custom-scrollbars";
import { ReactMic } from "react-mic";
import CloseIcon from "@mui/icons-material/Close";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import Welcome from "../../utils/WelcomePage";
import io from "socket.io-client";
import { BsEmojiSmile } from "react-icons/bs";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { SocketContext } from '../../context'
import { useContext } from "react";
import Loader from "../../utils/loader";


// const socket = io.connect("https://backend-wc4l.onrender.com/");
const socket = io.connect("http://localhost:8002");


const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#0159b2",
    icon: <ShareLocationIcon size={24} />,
    y: 312,
    title: "ShareLocation",
  },
];

const ChatInput = ({
  inputValue,
  handleChange,
  setOpenPicker,
  fileInputRef,
  handleFileChange,
  handleButtonClick,
  handleDocsFileChange,
  setInputValue,
  setTogetblob,
  microphone,
  handleShareLocation,
  updateMicrophoneValue,
  onEmojiClick,
  hideSelector,
  ClearInputField,
  setClearInputField,
  inputRef,
  DefaultValue,
  inputKey,
  textWithEmoji,
  selectedEmojis,
  setText,
  text,
  handleInputChange,
  addEmoji,
  setShowEmoji,
  showEmoji,
  openAction,
  setOpenAction
}) => {
  const videoRef = useRef(null);
  const [savedAudioBlob, setSavedAudioBlob] = useState(null);
  const [openPicker, setopenPicker] = useState(0);
  const [chatinput, setChatInput] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [FullRecordedBlob, setFullRecordedBlob] = useState(null);

  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typedvalue, setTypedvalue] = useState("");
  

  const onStart = () => {
    setIsRecording(true);
    setAudio(null); // Reset audio when starting a new recording
  };

  const onStop = (recordedBlob) => {
    setInputValue("Audio");
    setIsRecording(false);
    setRecordedBlob(recordedBlob.blob);
    setFullRecordedBlob(recordedBlob);
    setTogetblob(recordedBlob);
    
  };

  const handlePlayPause = () => {
    if (recordedBlob) {
      if (audio) {
        // If audio is present, toggle play/pause
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        // If audio is not present, create a new Audio element and start playing
        const newAudio = new Audio(URL.createObjectURL(recordedBlob));
        newAudio.play();
        newAudio.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        setAudio(newAudio);
        setIsPlaying(true);
      }
    }
  };

  const handleOpenCamera = async () => {};

  const handleClose = () => {
    updateMicrophoneValue(0);
  };

  const handleemojonclick = () => {};

  const handleOpenPicker = (value) => {
    setopenPicker(value);
  };

  const handleClick = (event, emojiObject) => {
    onEmojiClick(event, emojiObject, chatinput);
    handleChange(chatinput);
  };

  const handleCombinedChange = (event, emojiObject) => {
    setChatInput(event.target.value);
    handleChange(event, emojiObject);
  };

  const handleClearData = () => {
    if (ClearInputField == 1) {
      setClearInputField(0);
    } else {
      setClearInputField(1);
    }
  };


 


  
   

  return (
    <>
      {microphone === 1 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Audio Recorder</h1>
            <CloseIcon onClick={handleClose} />
          </div>

          <div>
            <ReactMic
              record={isRecording}
              className="sound-wave"
              onStop={onStop}
              onStart={onStart}
              strokeColor="#000000"
              backgroundColor="#FF4081"
            />
            <button onClick={() => setIsRecording(!isRecording)}>
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {recordedBlob && (
              <div>
                <button onClick={handlePlayPause}>
                  {isPlaying ? "Pause" : "Play"} Recorded Audio
                </button>
              </div>
            )}
          </div>
        </>
      ) : null}

      {/* <h3>GeeksforGeeks Emoji Picker</h3>
            {chosenEmoji ? (
                <span>
                    Your Emoji:
                    <img
                        style={{ width: "15px" }}
                        src={chosenEmoji}
                    />
                </span>
            ) : (
                <span>No Emoji</span>
            )} */}

              
            <Stack
          
             sx={{
              width: "max-content",
              marginLeft: "auto",
               }}
              
            >
              {hideSelector ? (
                <Stack
                  sx={{
                    position: "relative",
                    display: openAction ? "inline-block" : "none",
                  }}
                  
                >
                  {Actions.map((el) => (
                    <Tooltip
                      placement="right"
                      title={el.title}
                      key={el.title}
                      onClick={() => {
                        if (el.title == "Photo/Video") {
                          handleButtonClick();
                        }
                        if (el.title == "Document") {
                          handleButtonClick();
                        }
                        if (el.title == "Image") {
                          handleOpenCamera();
                        }
                        if (el.title == "Image") {
                          handleOpenCamera();
                        }
                        if (el.title == "ShareLocation") {
                          handleShareLocation();
                        }
                      }}
                    >
                      <Fab
                        sx={{
                          position: "absolute",
                          top: -el.y,
                          backgroundColor: el.color,
                        }}
                      >
                        {el.icon}
                      </Fab>
                    </Tooltip>
                  ))}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={(input) => (fileInputRef.current = input)}
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />

                  <input
                    type="file"
                    accept=".doc, .docx, .pdf, .txt" // Specify the document file types you want to accept
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleDocsFileChange(e);
                    }}
                  />
                </Stack>
              ) : null}

            
            </Stack>
            <InputGroup className="mb-3">
          
      <Form.Control
        value={text}
        onChange={(e) => {
          handleInputChange(e);
          
        }}
        key={inputKey}
        fullWidth
        ref={inputRef}
        placeholder="Type Your Text"
        aria-label="Username"
        aria-describedby="basic-addon1"
        variant="filled"
        autoFocus
      />

      <InputGroup.Text
        id="basic-addon1"
        onClick={() =>setShowEmoji(!showEmoji)}
        className="cursor-pointer hover:text-slate-300"
      >
        <BsEmojiSmile />
      </InputGroup.Text>
      
      <InputGroup.Text
        id="basic-addon1"
        onClick={() => setOpenAction((prev) => !prev)}
        className="cursor-pointer hover:text-slate-300"
      >
        <LinkSimple />
      </InputGroup.Text>
    </InputGroup>



           

           

      {/* <StyledInput
      
        key={inputKey}
        onClick={handleClearData}
        fullWidth
        ref={inputRef}
        placeholder={'Type Your Text'}
        variant="filled"
        onChange={(e) => setText(e.target.value)}
        value={inputValue}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              {hideSelector ? (
                <Stack
                  sx={{
                    position: "relative",
                    display: openAction ? "inline-block" : "none",
                  }}
                >
                  {Actions.map((el) => (
                    <Tooltip
                      placement="right"
                      title={el.title}
                      key={el.title}
                      onClick={() => {
                        if (el.title == "Photo/Video") {
                          handleButtonClick();
                        }
                        if (el.title == "Document") {
                          handleButtonClick();
                        }
                        if (el.title == "Image") {
                          handleOpenCamera();
                        }
                        if (el.title == "Image") {
                          handleOpenCamera();
                        }
                        if (el.title == "ShareLocation") {
                          handleShareLocation();
                        }
                      }}
                    >
                      <Fab
                        sx={{
                          position: "absolute",
                          top: -el.y,
                          backgroundColor: el.color,
                        }}
                      >
                        {el.icon}
                      </Fab>
                    </Tooltip>
                  ))}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={(input) => (fileInputRef.current = input)}
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />

                  <input
                    type="file"
                    accept=".doc, .docx, .pdf, .txt" // Specify the document file types you want to accept
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleDocsFileChange(e);
                    }}
                  />
                </Stack>
              ) : null}

              <InputAdornment>
                <IconButton onClick={() => setOpenAction((prev) => !prev)}>
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <InputAdornment>
              <div
                style={{
                  marginBottom: "520px",
                  marginLeft: "40px",
                }}
              >
                {openPicker === 1 ? (
                  <Picker
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={0}
                />
                ) : null}
              </div>

              <IconButton
                onClick={() => {
                  setOpenPicker((prev) => !prev);
                  handleOpenPicker(openPicker == 0 ? 1 : 0);
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          ),
        }}
      /> */}

      
    </>
  );
};

const GeneralApp = () => {

  

  const { answerCall, call, callAccepted, me } = useContext(SocketContext)
  

  
  const theme = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const user = useSelector((state) => state.app.user);

  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const [location, setLocation] = useState(null);
  const [data, setData] = useState([]);
  const [clickedChatId, setClickedChatId] = useState(null);
  const [userid, setUsername] = useState("");
  const [chatspace, setChatspace] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);

  const [chathistory, setChathistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [chatmasterid, setChatmasterid] = useState("");

  const [joinchatmaster, setJoinchatmaster] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [dpname, setDpname] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [SelectedImg, setSelectedImg] = useState(null);
  const [microphone, setClickmicrophone] = useState(0);
  const [Audio, setAudio] = useState("");
 
  const [star, setStar] = useState(false);
  const [Togetblob, setTogetblob] = useState("");
  const [openModal, setOpenModal] = useState(0);
  const [openModalImg, setOpenModalImg] = useState(false);
  const [hideSelector, setHideSelector] = useState(true);
  const [searchTermlist, setSearchTermlist] = useState("");
  const [editModel, setEditModel] = useState(0);
  const [EditData, setEditData] = useState("");
  const [ClearInputField, setClearInputField] = useState(1);
  
  const [OpenContact, setOpenContactlist] = useState(0);
  const [DefaultValue, setDefaultValue] = useState(0);
  const [inputKey, setInputKey] = useState(0);
  const [ControlScrool, setControlScrool] = useState(false);
  const [Downarrow, setDownarrow] = useState(0);
  const [OpenReplyModel, setOpenReplyModel] = useState(0);
  const [Replydata, setReplydata] = useState(0);
  const [Scroolvalue, setScroolvalue] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({});
  const [ForwardData, setForwardData] = useState('');
  const [msgForwardData, setMsgForwardData] = useState('');
  const [SendForwardMsg, setSendForwardMsg] = useState(0);
  const [Forwardchatid, setForwardChatmasterid] = useState('');
  const [LoaderOn, setLoaderOn] = useState('');
  const [Dbsubtype, setDbsubtype] = useState('');
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [PhoneCallrequest, setPhoneCallrequest] = useState(0);
  const [sessionUsers, setUsers] = useState(0);
  const [openAudioCall,setOpenAudioCall] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ClickUser, setClickUser] = useState(0);
  const [offscroolbar,setOffscroolbar] = useState(0)


  const inputRef = useRef(null);

  const filteredData = data.filter(
    (el) =>
      !el.pinned && el.name.toLowerCase().includes(searchTermlist.toLowerCase())
  );


    const handleCheckboxChange = async(contactId, data) => {
      const chatmasterId = await fetchContactlistChatid(userid, contactId);
       if(chatmasterId == null){
        setForwardChatmasterid('NoChatId');
       }else{
        setForwardChatmasterid(chatmasterId.chatmaster_id);
       }
      setCheckboxStates((prevStates) => {
        const isChecked = !prevStates[contactId];
        setForwardData(isChecked ? data : null);
        setSendForwardMsg(isChecked ? 1 : 0);
        return {
          ...prevStates,
          [contactId]: isChecked,
        };
      });
  
      


      
    };
  

  


    const handleInputChange = (e) => {
      const newText = e.target.value;
      setText(newText);
      setInputValue(newText);
    };
  
    const addEmoji = (e) => {
      const sym = e.unified.split("_");
      const codeArray = sym.map((el) => parseInt(el, 16));
      const emoji = String.fromCodePoint(...codeArray);
      setText((prevText) => prevText + emoji);
      setInputValue((prevText) => prevText + emoji);
    };


    const fetchContactlistChatid = async (userid, clickedChatId) => {
      try {
        const user_ids = {
          user_id: userid,
          receiver_id: clickedChatId,
        };
        const res = await axios.post(
          `${chatserverUrl}/getchatmasterid`,
          user_ids
        );
      
       
    
        if (res) {
          return res.data.data.chatmaster_id[0];
        } else {
          // Handle other cases if needed
          return null;
        }
      } catch (err) {
        // Handle errors
        return null;
      }
    };
    


  const scrollbarsRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const updateMicrophoneValue = (newValue) => {
    setClickmicrophone(newValue);
  };

  const clearInput = () => {
    setInputValue(""); // Clear the input value when needed
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    setAudioChunks((prevChunks) => [...prevChunks, recordedBlob]);
  };

  const onStop = (recordedBlob) => {
    setAudio(recordedBlob);
    setAudioChunks([]);
  };

  const handlePlay = (blobUrl) => {
    const audio = new Audio(blobUrl);
    audio.play();
  };

  const handleEmojiSelect = (emoji) => {};


   

  useEffect(() => {
    const handleKeyPress = async(event) => {
      
      // Check if the pressed key is Enter (key code 13)
      if (event.key === "Enter" && inputValue.length > 0) {
        try {
          const currentTime = new Date();
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const ampm = hours >= 12 ? "pm" : "am";
    
          // Convert 24-hour format to 12-hour format
          const formattedHours = hours % 12 || 12;
    
          const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
    
          const formData = new FormData();
          formData.append("senderid", userid);
          formData.append("receiverid", clickedChatId);
          formData.append("type", "msg");
          formData.append("message", inputValue);
          formData.append("time", formattedTime);
          formData.append("incoming", false); // Use boolean value instead of string
          formData.append("outgoing", true); // Use boolean value instead of string
          formData.append("subtype", Togetblob.blobURL ? "Audio" : Dbsubtype=='textwithemoji' ? 'textwithemoji' : '');
          formData.append("chatmaster_id", chatmasterid);
          formData.append("image", SelectedImg);
          formData.append("audio", Togetblob.blobURL);
          formData.append("reply", "");
          formData.append("Msgtype", "User");
    
          const axiosInstance = axios.create({
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          socket.emit("send_message", {
            message: inputValue,
          });
         
          
          const res = await axiosInstance.post(
            `${chatserverUrl}/msgconversation`,
            formData
          );
          setInputValue("");
          setInputKey((prevKey) => prevKey + 1);
          setSelectedEmojis("");
          if (res.data) {
            if (res.data.code == 200) {
              setControlScrool(true);
              setOffscroolbar(0);
              handleClear();
              setSelectedImg("");
              setInputValue("");
              setDefaultValue(1);
              OnclickfetchSenderReceiverMsg(chatmasterid, userid);
              setClearInputField(0);
              setTogetblob('');
              setDbsubtype('');
              setText('');
              setShowEmoji(false);
            } else {
              console.log(res);
            }
          }
        } catch (err) {
          console.log("err", err);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [inputValue,Togetblob.blobURL,chatmasterid,SelectedImg,userid,clickedChatId,Dbsubtype]);

  const handleKeyDown = (e) => {
    // // Check if the down arrow key is pressed (keyCode 40)
    // if (e.keyCode === 40) {
    //   // Scroll down the div
    //   scrollbarsRef.current.scrollTop += 10; // You can adjust the scroll distance as needed
    // }
  };
  



  useEffect(() => {
    if(scrollbarsRef.current && ControlScrool == true && offscroolbar == 0){
      scrollbarsRef.current.scrollToBottom();
    }

      if(scrollbarsRef.current && Scroolvalue.trim() == 'scrooldown' && offscroolbar == 0){
        scrollbarsRef.current.scrollToBottom();
      }

      if(scrollbarsRef.current && chathistory.length < 10){
        scrollbarsRef.current.scrollToTop();
      }
    
      if(offscroolbar == 1){

      }
    if (socket.connected) {
      const receiveMessageHandler = (data) => {
        try {
          if (data === "success") {
            OnclickfetchSenderReceiverMsg(chatmasterid, userid);
          
          
          }
        } catch (error) {
          console.error("Error in receiveMessageHandler:", error);
        }
      };

      socket.on("receive_message", receiveMessageHandler);

      return () => {
        socket.off("receive_message", receiveMessageHandler);
      };
    }
  }, [chatmasterid, userid, socket, inputRef, scrollbarsRef, chathistory, ControlScrool,offscroolbar]); // Run when chatmasterid or userid changes


useEffect(() => {
  if(loading === false && scrollbarsRef.current && offscroolbar == 0){
    scrollbarsRef.current.scrollToBottom();
  }
}, [loading,scrollbarsRef,offscroolbar])

  

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData) {
    
      setUsername(authData.user.id);
      setUsers(authData.user)
    }

    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const groupValue = urlParts[urlParts.length - 1];

    

    const fetchData = async () => {
      try {
        var authData = JSON.parse(window.localStorage.getItem("auth"));

        const listdetails = {
          id: authData.user.id,
          receiver_id: clickedChatId,
        };

        const response = await axios.post(`${serverUrl}/chatlist`, listdetails);
        setData(response.data.data.chatlist);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchchatmasterId = async () => {
      try {
        const user_ids = {
          user_id: userid,
          receiver_id: clickedChatId,
        };
        const res = await axios.post(
          `${chatserverUrl}/getchatmasterid`,
          user_ids
        );

        setChatmasterid(res.data.data.chatmaster_id[0].chatmaster_id);
        if (res.data) {
          if (res.data.code == 200) {
          } else {
          }
        }
      } catch (err) {}
    };

    fetchchatmasterId();

   
  }, [chathistory, openModal, socket, chatmasterid, userid, ControlScrool]);

  const fetchSenderReceiverMsg = async (chat_masterid, s_id) => {
    try {
      const chathistoryids = {
        chatmasterid: chat_masterid,
        sender_id: s_id,
      };

      const response = await axios.post(
        `${serverUrl}/messages`,
        chathistoryids
      );
    
      setChathistory(response.data.data.history);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



   

  const onEmojiClick = (event, emojiObject, data) => {
    inputRef.current.focus();
    const newSelectedEmojis = [...selectedEmojis, emojiObject.target.src];
    setSelectedEmojis(newSelectedEmojis);
    setChosenEmoji(emojiObject.target.src);
  
    setInputValue((prevText) => {
      // Combine selected emojis and existing inputValue
      const mergedText = newSelectedEmojis.join(',') + prevText;
      return mergedText;
    });
  
    // Set other state values
    setDbsubtype('textwithemoji');
  };
  

  const textWithEmoji = (text) => {
   
  
  }



  const closeEditdata = () => {
    setEditModel(0);
  };

  const onchangeFetchMasterid = async (userids, clickedChatIds) => {
    try {
      const user_ids = {
        user_id: userids,
        receiver_id: clickedChatIds,
      };
      const res = await axios.post(
        `${chatserverUrl}/getchatmasterid`,
        user_ids
      );
      if (res.data) {
        if (res.data.code == 200) {
          setChatmasterid(
            res.data.data.chatmaster_id[0].chatmaster_id.length === 0
              ? ""
              : res.data.data.chatmaster_id[0].chatmaster_id
          );
        } else {
        }
      }
    } catch (err) {
      setChatmasterid("");
    }
  };




  const OnclickfetchSenderReceiverMsg = async (chat_masterid, s_id) => {
    try {
      const chathistoryids = {
        chatmasterid: chat_masterid,
        sender_id: s_id,
      };

      const response = await axios.post(
        `${serverUrl}/messages`,
        chathistoryids
      );
      
      if (socket.connected) {
        setChathistory(response.data.data.history);
      
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = {
        message_id: id.id,
        chatmasterid: id.chatmaster_id,
      };

      const res = await axios.post(`${chatserverUrl}/deleteconversemsg`, data);
      if (res.data) {
        if (res.data.code == 200) {
          // fetchSenderReceiverMsg(id.chatmaster_id, id.sender_id);
          toast.success(res.data.data.message);
        } else {
          toast.error(res.data.data.message);
        }
      }
    } catch (err) {
      toast.error("Failed. " + err.response.data.data.message);
    }
  };

  const handelmaindelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDelete(id);
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const OnclickfetchJoinMasterid = async (userid, clickedChatId) => {
    try {
      const user_ids = {
        user_id: userid,
        receiver_id: clickedChatId,
      };
      const res = await axios.post(`${chatserverUrl}/joinchatmaster`, user_ids);

      if (res.data) {
        if (res.data.code == 200) {
          setJoinchatmaster(res.data.data.chatmaster_id);
        } else {
          setJoinchatmaster(res.data.data.chatmaster_id);
        }
      }
    } catch (err) {}
  };

  const handleChatClick = (chatmasterid, s_id, r_id, profileimg, name, e, loader) => {
    setOffscroolbar(0);
    setLoading(true);
    setScroolvalue('scrooldown');
    setControlScrool(false);
    onchangeFetchMasterid(s_id, r_id);
    OnclickfetchJoinMasterid(s_id, r_id);
    setLoaderOn(loader);
    // Set the clicked chat id in the state
    setClickedChatId(r_id);
    setChatspace(true);
    setProfileImg(profileimg);
    setDpname(name);
    setChatmasterid(chatmasterid);
    // Call otherFunction or any other logic you need
    otherFunction(chatmasterid);
    OnclickfetchSenderReceiverMsg(chatmasterid, s_id);
    setTimeout(() => {
      setLoading(false);
      if (scrollbarsRef.current) {
        scrollbarsRef.current.scrollToBottom();
      }
    }, 2000)
  };

  const otherFunction = (id) => {
    // Your otherFunction logic here
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setInputValue(
            `https://www.google.com/maps?q=${location.lat},${location.lng}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const { sidebar } = useSelector((store) => store.app); // access our store inside component

  const handleChange = (event, emoj) => {
    setInputValue(event.target.value);
  };

  const handleChatMaster = async () => {
    const headerdetails = {
      sender_id: userid,
      receiver_id: clickedChatId,
    };
    try {
      const res = await axios.post(`${chatserverUrl}/StarChat`, headerdetails);

      if (res.data) {
        fetchSenderReceiverMsg(res.data.data.chatmasterid, userid);
        setJoinchatmaster(1);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleClear = () => {};

 

  const handleSendmessage = async (event) => {
    setOpenPicker(0);
    event.preventDefault();
    try {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      // Convert 24-hour format to 12-hour format
      const formattedHours = hours % 12 || 12;

      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

      const formData = new FormData();
      formData.append("senderid", userid);
      formData.append("receiverid", clickedChatId);
      formData.append("type", "msg");
      formData.append("message", inputValue);
      formData.append("time", formattedTime);
      formData.append("incoming", false); // Use boolean value instead of string
      formData.append("outgoing", true); // Use boolean value instead of string
      formData.append("subtype", Togetblob.blobURL ? "Audio" : Dbsubtype=='textwithemoji' ? 'textwithemoji' : '');
      formData.append("chatmaster_id", chatmasterid);
      formData.append("image", SelectedImg);
      formData.append("audio", Togetblob.blobURL);
      formData.append("reply", "");
      formData.append("Msgtype", "User");

      const axiosInstance = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      socket.emit("send_message", {
        message: inputValue,
      });
     
      
      const res = await axiosInstance.post(
        `${chatserverUrl}/msgconversation`,
        formData
      );
      setInputValue("");
      setInputKey((prevKey) => prevKey + 1);
      setSelectedEmojis("");
      if (res.data) {
        if (res.data.code == 200) {

          setControlScrool(true);
          setOffscroolbar(0);
          handleClear();
          setSelectedImg("");
          setInputValue("");
          setDefaultValue(1);
          OnclickfetchSenderReceiverMsg(chatmasterid, userid);
          setClearInputField(0);
          setTogetblob('');
          setDbsubtype('');
          setText('');
          setShowEmoji(false);
        } else {
          console.log(res);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleModelImage = (event) => {
    handleSendmessage(event);
    setOpenModal(0);
    setHideSelector(true);
  };

  const handleFileChange = (e) => {
    // Handle the selected file
    const selectedFile = e.target.files[0];
    setSelectedImg(selectedFile);
    setOpenModalImg(selectedFile);
    setOpenModal(1);
    setOpenAction(false);
    fileInputRef.current.value = null;
    setHideSelector(false);
  };

  const handelModelClose = () => {
    setOpenModal(0);
    setHideSelector(true);
  };
  const handleDocsFileChange = (e) => {
    const selectedDocsFile = e.target.files[0];
    if (selectedDocsFile) {
      // Check if the selected file is a document
      if (
        selectedDocsFile.type.startsWith("application/") ||
        selectedDocsFile.type === "text/plain"
      ) {
        console.log("Selected document:", selectedDocsFile);
        // Do something with the selected document
      } else {
        alert("Please select a valid document file.");
      }
    }
  };
  const handleButtonClick = () => {
    // Trigger the click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = null;
    }
  };

  const handleDocsButtonClick = () => {
    // Trigger the click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
      fileInputRef.current.value = null;
    }
  };

  const handlemicrophone = () => {
    setClickmicrophone(1);
  };

  const getemoj = async (emoji, messagedata) => {
    try {
      
      const id = messagedata.id;
      const sender_id = messagedata.sender_id;
      const receiver_id = messagedata.receiver_id;
      const time = messagedata.time;
      const message = messagedata.message;

      const formData = {
        id: id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        time: time,
        message: message,
        emoji: emoji.imageUrl,
      };

      const res = await axios.post(`${chatserverUrl}/reaction`, formData);
      
      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
          setControlScrool(false);
          setScroolvalue('scroolup');
          setSelectedImg("");
          setInputValue("");
          setText("");
         
          fetchSenderReceiverMsg(chatmasterid, userid);
          setInputKey((prevKey) => prevKey + 1);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

   const closeReplydata = () => {
    setOpenReplyModel(0);
   }


  const ReplyMsgs = async (e, data) => {
    e.preventDefault();
    setOpenReplyModel(1);
    setReplydata(data);
   
    setDbsubtype('reply');
    
  };


const handlesendReply = async(e) => {
 console.log('replyt send successfully',Replydata.img);
  e.preventDefault();
    try {
      const axiosInstance = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      // Convert 24-hour format to 12-hour format
      const formattedHours = hours % 12 || 12;

      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

      const formData = new FormData();
      formData.append("senderid", userid);
      formData.append("receiverid", clickedChatId);
      formData.append("type", "msg");
      formData.append("message", Replydata.message);
      formData.append("time", formattedTime);
      formData.append("incoming", false); // Use boolean value instead of string
      formData.append("outgoing", true); // Use boolean value instead of string
      formData.append("subtype", Dbsubtype);
      formData.append("chatmaster_id", chatmasterid);
      formData.append("image", Replydata.img);
      formData.append("audio", '');
      formData.append("reply", inputValue);
      formData.append("Msgtype", "User");

      const res = await axiosInstance.post(
        `${chatserverUrl}/msgconversation`,
        formData
      );

      if (res.data) {
        if (res.data.code == 200) {
          setOpenReplyModel(0);
          handleClear();
          setSelectedImg("");
          OnclickfetchSenderReceiverMsg(chatmasterid,userid);
          setInputValue("");
          setText("");
          
          setDbsubtype('');
          setInputKey((prevKey) => prevKey + 1);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
}

const handlecallRequest = async(e) => {
  e.preventDefault();
  try {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    const formData = new FormData();
    formData.append("senderid", userid);
    formData.append("receiverid", clickedChatId);
    formData.append("type", "msg");
    formData.append("message", `${sessionUsers.firstname} ${sessionUsers.lastname}`);
    formData.append("time", formattedTime);
    formData.append("incoming", false); // Use boolean value instead of string
    formData.append("outgoing", true); // Use boolean value instead of string
    formData.append("subtype", 'callRequest');
    formData.append("chatmaster_id", chatmasterid);
    formData.append("image", '');
    formData.append("audio", '');
    formData.append("reply", "");
    formData.append("call_request", me);
    formData.append("Msgtype", "User");

    const axiosInstance = axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    socket.emit("send_message", {
      message: inputValue,
    });
   
    
    const res = await axiosInstance.post(
      `${chatserverUrl}/msgconversation`,
      formData
    );
    setInputValue("");
    setInputKey((prevKey) => prevKey + 1);
    setSelectedEmojis("");
    if (res.data) {
      if (res.data.code == 200) {

        setControlScrool(true);
        
        handleClear();
        setSelectedImg("");
        setInputValue("");
        setDefaultValue(1);
        OnclickfetchSenderReceiverMsg(chatmasterid, userid);
        setClearInputField(0);
        setTogetblob('');
        setDbsubtype('');
        setText('');
        setShowEmoji(false);
      } else {
        console.log(res);
      }
    }
  } catch (err) {
    console.log("err", err);
  }
 }


 const handleAudiocallRequest = async(e) => {
  e.preventDefault();
   
      try {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    const formData = new FormData();
    formData.append("senderid", userid);
    formData.append("receiverid", clickedChatId);
    formData.append("type", "msg");
    formData.append("message", `${sessionUsers.firstname} ${sessionUsers.lastname}`);
    formData.append("time", formattedTime);
    formData.append("incoming", false); // Use boolean value instead of string
    formData.append("outgoing", true); // Use boolean value instead of string
    formData.append("subtype", 'AudiocallRequest');
    formData.append("chatmaster_id", chatmasterid);
    formData.append("image", '');
    formData.append("audio", '');
    formData.append("reply", "");
    formData.append("call_request", me);
    formData.append("Msgtype", "User");

    const axiosInstance = axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    socket.emit("send_message", {
      message: inputValue,
    });
   
    
    const res = await axiosInstance.post(
      `${chatserverUrl}/msgconversation`,
      formData
    );
    setInputValue("");
    setInputKey((prevKey) => prevKey + 1);
    setSelectedEmojis("");
    if (res.data) {
      if (res.data.code == 200) {

        setControlScrool(true);
        
        handleClear();
        setSelectedImg("");
        setInputValue("");
        setDefaultValue(1);
        OnclickfetchSenderReceiverMsg(chatmasterid, userid);
        setClearInputField(0);
        setTogetblob('');
        setDbsubtype('');
        setText('');
        setShowEmoji(false);
      } else {
        console.log(res);
      }
    }
  } catch (err) {
    console.log("err", err);
  }
 }

//  const handleAudiocallRequest = async(e) => {
//   e.preventDefault();
//   try {
//     const currentTime = new Date();
//     const hours = currentTime.getHours();
//     const minutes = currentTime.getMinutes();
//     const ampm = hours >= 12 ? "pm" : "am";

//     // Convert 24-hour format to 12-hour format
//     const formattedHours = hours % 12 || 12;

//     const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

//     const formData = new FormData();
//     formData.append("senderid", userid);
//     formData.append("receiverid", clickedChatId);
//     formData.append("type", "msg");
//     formData.append("message", `${sessionUsers.firstname} ${sessionUsers.lastname}`);
//     formData.append("time", formattedTime);
//     formData.append("incoming", false); // Use boolean value instead of string
//     formData.append("outgoing", true); // Use boolean value instead of string
//     formData.append("subtype", 'AudiocallRequest');
//     formData.append("chatmaster_id", chatmasterid);
//     formData.append("image", '');
//     formData.append("audio", '');
//     formData.append("reply", "");
//     formData.append("call_request", me);

//     const axiosInstance = axios.create({
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     socket.emit("send_message", {
//       message: inputValue,
//     });
   
    
//     const res = await axiosInstance.post(
//       `${chatserverUrl}/msgconversation`,
//       formData
//     );
//     setInputValue("");
//     setInputKey((prevKey) => prevKey + 1);
//     setSelectedEmojis("");
//     if (res.data) {
//       if (res.data.code == 200) {

//         setControlScrool(true);
        
//         handleClear();
//         setSelectedImg("");
//         setInputValue("");
//         setDefaultValue(1);
//         OnclickfetchSenderReceiverMsg(chatmasterid, userid);
//         setClearInputField(0);
//         setTogetblob('');
//         setDbsubtype('');
//         setText('');
//         setShowEmoji(false);
//       } else {
//         console.log(res);
//       }
//     }
//   } catch (err) {
//     console.log("err", err);
//   }
//  }



const handleForwardmessage = async(e) => {
 

  e.preventDefault();
  try {
    const axiosInstance = axios.create({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    const formData = new FormData();
    formData.append("senderid", userid);
    formData.append("receiverid", ForwardData.id);
    formData.append("type", "msg");
    formData.append("message", msgForwardData.message);
    formData.append("time", formattedTime);
    formData.append("incoming", false); // Use boolean value instead of string
    formData.append("outgoing", true); // Use boolean value instead of string
    formData.append("subtype", Dbsubtype);
    formData.append("chatmaster_id", Forwardchatid);
    formData.append("image", SelectedImg);
    formData.append("audio", '');
    formData.append("reply", inputValue);
    formData.append("Msgtype", "User");

    const res = await axiosInstance.post(
      `${chatserverUrl}/msgconversation`,
      formData
    );

    if (res.data) {
      if (res.data.code == 200) {
        setOpenReplyModel(0);
        handleClear();
        setSelectedImg("");
        setOpenContactlist(0);
        setForwardData(null);
        setCheckboxStates({});
        setSendForwardMsg(0);
        setInputValue("");
        setText("");
       
        setDbsubtype('');
        fetchSenderReceiverMsg(chatmasterid, userid);
        setInputKey((prevKey) => prevKey + 1);
        toast.success(res.data.data.message);
      } else {
        console.log(res);
      }
    }
  } catch (error) {
    console.log(error);
  }
  
}





  const onEmojiClicks = (emoji) => {};

  const handlestar = async (e, messagedata) => {
    e.preventDefault();
    try {
      const id = messagedata.id;
      const sender_id = messagedata.sender_id;
      const receiver_id = messagedata.receiver_id;
      const time = messagedata.time;
      const message = messagedata.message;

      const formData = {
        id: id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        time: time,
        message: message,
        emoji: "",
        star: 1,
      };

      const res = await axios.post(`${chatserverUrl}/reaction`, formData);

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
          OnclickfetchSenderReceiverMsg(chatmasterid, userid);
          setSelectedImg("");
          setInputValue("");
          setText("");
          setControlScrool(false);
          setScroolvalue('scroolup');
          setInputKey((prevKey) => prevKey + 1);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    // console.log(data);
    setEditData(data);
    //setInputValue(data.message);
    setEditModel(1);
  };

  const handleUnstar = async (e, messagedata) => {
    e.preventDefault();
    try {
      const id = messagedata.id;
      const sender_id = messagedata.sender_id;
      const receiver_id = messagedata.receiver_id;
      const time = messagedata.time;
      const message = messagedata.message;

      const formData = {
        id: id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        time: time,
        message: message,
        emoji: "",
        star: 0,
      };

      const res = await axios.post(`${chatserverUrl}/reaction`, formData);

      if (res.data) {
        if (res.data.code == 200) {
          handleClear();
          setSelectedImg("");
          setInputValue("");
          setText("");
          
          setControlScrool(false);
          setScroolvalue('scroolup');
          fetchSenderReceiverMsg(chatmasterid, userid);
          setInputKey((prevKey) => prevKey + 1);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEdit = async () => {
    setEditModel(0);
    try {
      const axiosInstance = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData = {
        id: EditData.id,
        updatedvalue: inputValue,
        msgdate: EditData.date_added,
      };

      
      const res = await axios.post(
        `${chatserverUrl}/editConversation`,
        formData
      );

      if (res.data) {
        if (res.data.code == 200) {
          setSelectedImg("");
          OnclickfetchSenderReceiverMsg(chatmasterid, userid);
          setInputValue("");
          setText("");
       
          setControlScrool(true);
          setInputKey((prevKey) => prevKey + 1);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openContactlist = (data) => {
    setMsgForwardData(data);
    
    setOpenContactlist(1);
    setDbsubtype('forward');
  };

  const closeContactlist = () => {
    setOpenContactlist(0);
    setForwardData(null);
    setCheckboxStates({});
    setSendForwardMsg(0);
  };

  const handleScroll = () => {
  
    const values = scrollbarsRef.current?.getValues();
 
    setDownarrow(1);
   
    // Check if the user has scrolled to the bottom
    if (
      values &&
      values.top !== undefined &&
      values.top >= 0.9996941709372611
    ) {
      
      const isAtBottom = values.top >= 0.95;

      if (isAtBottom) {
        setDownarrow(0);
      }
    }
  };

  const handleDownarrow = () => {
    
    scrollbarsRef.current.scrollToBottom({ behavior: "smooth" });
    
  };


  


  const showNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('This is a notification!');
        }
      });
    } else {
      alert('Notifications not supported in this browser.');
    }
  };


  

  
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* Chats */}
      {/* Render the modal based on the state */}
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
         

          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                value={searchTermlist}
                onChange={(e) => setSearchTermlist(e.target.value)}
              />
            </Search>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>

          <Stack
            className="scrollbar"
            spacing={2}
            direction="column"
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <Stack spacing={2.4}>
              {filteredData.map((el) => (
                <ChatElement
                  key={el.id}
                  {...el}
                  datas={el}
                  onClick={(e) =>
                    handleChatClick(
                      el.chatmasterid,
                      userid,
                      el.id,
                      el.img,
                      el.name,
                      e,
                      'loading'
                    )
                  }
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        {chatspace ? (
          <>
            {joinchatmaster === 1 ? (
              <>
                {/* <Conversation/> */}
                
                <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
                  {/* Chat header */}
                  <Header
                    profilepic={profileImg}
                    name={dpname}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    chatmasterid={chatmasterid}
                    userid={userid}
                    clickedChatId={clickedChatId}
                    setPhoneCallrequest={setPhoneCallrequest}
                    setOpenAudioCall={setOpenAudioCall}
                    handlecallRequest={handlecallRequest}
                    handleAudiocallRequest={handleAudiocallRequest}
                  />
                  {/* Msg */}



                  {loading ? (
                    <Loader style={{
  backdropFilter: 'blur(10px)'
}} />
      ) : (
        <Scrollbars
        onKeyDown={handleKeyDown}
                    onScroll={(values) => handleScroll(values)}
                    ref={scrollbarsRef}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMax="100%"
                    style={{
                      width: "100%",
                      height: "100vh",
                      backgroundImage:
                        "url('https://as1.ftcdn.net/v2/jpg/01/99/79/88/1000_F_199798806_PAFfWGapie6Mk8igqKHbhIIa9LwQcvQr.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                    }}
                    renderThumbVertical={({ style, ...props }) => (
                      <div
                        {...props}
                        style={{
                          ...style,
                          backgroundColor: "#888",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  >
                 
                    <div>

                   
                     
                       <Message
                        menu={true}
                        senderid={userid}
                        receiverid={clickedChatId}
                        chathistory={chathistory}
                        handelmaindelete={handelmaindelete}
                        ReplyMsgs={ReplyMsgs}
                        onEmojiClicks={onEmojiClicks}
                        getemoj={getemoj}
                        closeEmoji={false}
                        handlestar={handlestar}
                        star={star}
                        setStar={setStar}
                        searchTerm={searchTerm}
                        handleUnstar={handleUnstar}
                        openModal={openModal}
                        openModalImg={openModalImg}
                        handelModelClose={handelModelClose}
                        handleModelImage={handleModelImage}
                        setInputValue={setInputValue}
                        editModel={editModel}
                        handleEdit={handleEdit}
                        EditData={EditData}
                        closeEditdata={closeEditdata}
                        openContactlist={openContactlist}
                        OpenContact={OpenContact}
                        data={data}
                        closeContactlist={closeContactlist}
                        Downarrow={Downarrow}
                        handleDownarrow={handleDownarrow}
                        OpenReplyModel={OpenReplyModel}
                        Replydata={Replydata}
                        handleCheckboxChange={handleCheckboxChange}
                        checkboxStates={checkboxStates}
                        LoaderOn={LoaderOn}
                        setLoaderOn={setLoaderOn}
                        closeReplydata={closeReplydata}
                        addEmoji={addEmoji}
                        showEmoji={showEmoji}
                        setOpenAction={setOpenAction}
                        openAudioCall={openAudioCall}
                        setOffscroolbar={setOffscroolbar}
                      /> 
                    </div>

          
                  </Scrollbars>
      )}



                  



                 
                  {/* Chat footer */}
                  {/* <Footer senderid={userid} receiverid={clickedChatId}/> */}
                 
                 
                  {/* <Options>
              <Notifications />
            </Options> */}
                  <Box
                    p={2}
                    sx={{
                      width: "100%",
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "#F8FAFF"
                          : theme.palette.background.paper,
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                    }}
                  >
                    <Stack direction="row" alignItems={"center"} spacing={3}>
                      <Stack sx={{ width: "100%" }}>

                    


                        {/* Chat Input */}
                        <Box
                          sx={{
                            display: openPicker ? "inline" : "none",
                            zIndex: 10,
                            position: "fixed",
                            bottom: 81,
                            right: 100,
                          }}
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        ></Box>

                        <div style={{ display: "flex" }}>
      
      </div>

                        {editModel === 1 || OpenReplyModel === 1 ? (
                          <TextField
                            required
                           
                            label="Required"
                            defaultValue={EditData ? EditData.message : ''}
                            onChange={(e) => setInputValue(e.target.value)}
                            autoFocus
                          />
                        ) : (
                          <>

                         
                         
                            <ChatInput
                            showEmoji={showEmoji}
                           setShowEmoji={setShowEmoji}
                           handleInputChange={handleInputChange}
                            addEmoji={addEmoji}
                            setText={setText}
                            text={text}
                              setOpenPicker={setOpenPicker}
                              handleChange={handleChange}
                              handleClear={handleClear}
                              fileInputRef={fileInputRef}
                              handleFileChange={handleFileChange}
                              handleButtonClick={handleButtonClick}
                              handleDocsFileChange={handleDocsFileChange}
                              handleDocsButtonClick={handleDocsButtonClick}
                              isRecording={isRecording}
                              onStop={onStop}
                              onData={onData}
                              startRecording={startRecording}
                              stopRecording={stopRecording}
                              microphone={microphone}
                              updateMicrophoneValue={updateMicrophoneValue}
                              clearInput={clearInput}
                              handleShareLocation={handleShareLocation}
                              handleEmojiSelect={handleEmojiSelect}
                              onEmojiClick={onEmojiClick}
                              chosenEmoji={chosenEmoji}
                              setTogetblob={setTogetblob}
                              setInputValue={setInputValue}
                              hideSelector={hideSelector}
                              ClearInputField={ClearInputField}
                              setClearInputField={setClearInputField}
                              inputRef={inputRef}
                              DefaultValue={DefaultValue}
                              inputKey={inputKey}
                              setDbsubtype={setDbsubtype}
                              textWithEmoji={textWithEmoji}
                              selectedEmojis={selectedEmojis}
                              setOpenAction={setOpenAction}
                              openAction={openAction}

                              
                            />
                          </>
                        )}
                      </Stack>
                      <div></div>

                      <Box
                        sx={{
                          height: 48,
                          width: 48,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: 1.5,
                        }}
                      >
                        <Stack
                          sx={{
                            height: "100%",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                       <IconButton>
                         {SendForwardMsg == 1 ? (
                         <PaperPlaneTilt color="#fff" onClick={handleForwardmessage} />
                         ) : inputValue.length === 0 ? (
                         Audio ? (
                           <PaperPlaneTilt color="#fff" onClick={handleSendmessage} />
                         ) : editModel === 1 ? (
                           <Check color="#fff" onClick={handleCloseEdit} />
                         ) : (
                           <Microphone color="#fff" onClick={handlemicrophone} />
                         )
                         ) : OpenReplyModel === 1 ? (
                           <PaperPlaneTilt color="#fff" onClick={(e) => handlesendReply(e)} />
                         ) : editModel === 1 ? (
                           <Check color="#fff" onClick={handleCloseEdit} />
                         ) : (
                           <PaperPlaneTilt color="#fff" onClick={handleSendmessage} />
                         )}
                       </IconButton>

                        
                       

                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </>
            ) : (
              <>
                <StartChat onClick={handleChatMaster} />
              </>
            )}
          </>
        ) : (
          <div><Welcome /></div>
        )}
      </Box>
    </Stack>
  );
};

export default GeneralApp;
