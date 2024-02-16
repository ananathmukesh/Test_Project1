import React, { useState } from 'react';
import '../css/download_loader.css'; // Import your CSS file
import axios from 'axios';

const DownloadButton = ({ onComplete }) => {
  const [buttonState, setButtonState] = useState(''); // '', 'load', 'done'

  const handleDownload = () => {
    setButtonState('load');

    setTimeout(() => {
      setButtonState('done');
      
      // Notify parent component that the download is complete
      onComplete();

      setTimeout(() => {
        setButtonState('');
      }, 8000); // Set the duration as needed for your animation
    }, 2000);
  };

  return (
    <div className={`btn-circle-download ${buttonState}`} onClick={handleDownload} style={{position:"absolute"}}>
      <svg id="arrow" width="14px" height="20px" viewBox="17 14 14 20">
        <path d="M24,15 L24,32"></path>
        <polyline points="30 27 24 33 18 27"></polyline>
      </svg>
      <svg id="check" width="21px" height="15px" viewBox="13 17 21 15">
        <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
      </svg>
      <svg id="border" width="48px" height="48px" viewBox="0 0 48 48">
        <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
      </svg>
    </div>
  );
};

const CenteredLoader = ({ imageUrl,msgId,el,setOffscroolbar }) => {
  const [isBlur, setIsBlur] = useState(true);

  const handleComplete = async() => {
   

    const ImageUrls = imageUrl;
    const urlParts = ImageUrls.split('/');
    const filename = urlParts.pop();

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


    setOffscroolbar(1);
    setIsBlur(false);
    try {
     const up_id = {
        id:el.id
      }
      const res = await axios.post('http://localhost:8001/chat/upl_download_status',up_id);
      if(res.data){
        if(res.data.code === 200){
          console.log(res.data.data);
         console.log(imageUrl);
         setIsBlur(false);
        }else{
          console.log(res);
        }
      }
    } catch (error) {
       console.log(error);
    }
  };


  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
    <div className={`image-container ${el.download_status == "1" ? 'blur' : ''}`}>
      <img
        className="image"
        src={imageUrl}
        alt="Download"
        style={{ maxHeight: 210, borderRadius: "10px" , position
        :"relative"}}
      />
    </div>
    {el.download_status === "1" && isBlur && (
      <DownloadButton onComplete={handleComplete} />
    )}
    
    <style>{`
      .image-container {
        max-width: 100%;
        height: auto;
        display: inline-block;
        position: relative;
        overflow: hidden; /* Add overflow: hidden to avoid shaking */
      }
      .image {
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
      }
      .btn-circle-download {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .blur {
        filter: blur(5px); /* Adjust the blur intensity as needed */
      }
    `}</style>
  </div>
  
  );
};

const Downloader = ({ imageUrl,msgId,el,setOffscroolbar }) => {

  return (
    <CenteredLoader msgId={msgId} imageUrl={imageUrl} setOffscroolbar={setOffscroolbar} el={el} style={{ maxHeight: 210, borderRadius: "10px" }}/>
  );
};

export default Downloader;
