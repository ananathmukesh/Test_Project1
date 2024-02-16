import React, { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
    setIsRecording(false);
  };

  
  const onSaveAudio = () => {
    console.log(audioBlob);
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.mp3');
  
      fetch('http://localhost:8001/chat/mp3', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(datas => {
          console.log('Audio saved successfully:', datas);
        })
        .catch(error => {
          console.error('Error saving audio:', error);
        });
    }
  };
  


  const onPlayAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        onStop={onStopRecording}
        onData={() => {}}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={onStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={onStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={onSaveAudio} disabled={!audioBlob}>
        Save Audio
      </button>
      <button onClick={onPlayAudio} disabled={!audioBlob}>
        Play Audio
      </button>
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default AudioRecorder;
