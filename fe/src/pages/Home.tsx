import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

type Note = [string, string]

const Home = () => {
  const [isRecording, setIsRecording] = useState(false as boolean);
  const [note, setNote] = useState("" as string);
  const [savedNotes, setSavedNotes] = useState([] as Array<Note>);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [consultationText, setConsultationText] = useState<string | null>(null);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    const now = new Date();
    setSavedNotes((prevNotes) => [...prevNotes, [now.toLocaleTimeString(), note]]);
    setNote("");
  };

  const startRecording = () => {
    if (audioBlob) {
      setAudioBlob(null)
      setAudioUrl(null)
      setSavedNotes([])
      setConsultationText("")
    }
    if (mediaRecorder) {
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const sendAudioToBackend = () => {
    if (!audioBlob) return;
  
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('notes', savedNotes.toString())
  
    fetch('http://localhost:8080/uploadAudio', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Audio uploaded successfully:', data);
        setConsultationText(data.consultationRecording)
      })
      .catch(error => {
        console.error('Error uploading audio:', error);
      });
  };

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    }
  }, [audioBlob]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        
        recorder.ondataavailable = (e) => {
          setAudioBlob(e.data);
        };
      })
      .catch((err) => console.error('Error accessing microphone:', err));
  }, []);

  return (
    <div className="min-h-screen bg-back-grey text-text-white">
      <div className="pt-20 pb-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-2">Consultation Recorder</h1>
          <p className="w-2/3 text-center">
            Welcome to your all-in-one consultation recording software. When you are ready to begin your session, hit record. 
            Feel free to add any notes and generate the session when you are done.
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center mb-20'>
        <p className="pr-40 w-1/4 ml-12">
          {isRecording ? "Recording..." : "Not Recording"}
        </p>
        <Button
          className="w-32"
          variant="contained"
          onClick={toggleRecording}
          sx={{
            marginRight: "2rem",
            backgroundColor: "#007AF5",
            "&:hover": {
              backgroundColor: "#003D7A",
            },
          }}
        >
          {isRecording ? "Stop" : "Record"}
        </Button>
      </div>

      {audioUrl && (
        <div className="flex justify-center items-center pb-20">
          <audio controls>
            <source src={audioUrl} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="flex justify-center items-center w-full mb-10">
        <input
          type="text"
          value={note}
          onChange={handleInputChange}
          placeholder="Type your note here..."
          className="border border-gray-300 rounded-md px-4 py-1.5 w-1/5 mr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <Button
          className="w-32"
          variant="contained"
          onClick={handleSaveNote}
          sx={{
            backgroundColor: "#007AF5",
            "&:hover": {
              backgroundColor: "#003D7A",
            },
          }}
        >
          Add Note
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center w-full pb-10">
        <h1>Notes:</h1>
        <ul>
          {savedNotes.map(([time, item], index) => (
            <li key={index} className="text-center">{time}: {item}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center w-full pb-20">
        <Button
          className="w-64 ml-4"
          variant="contained"
          onClick={sendAudioToBackend}
          sx={{
            backgroundColor: "#007AF5",
            "&:hover": {
              backgroundColor: "#003D7A",
            },
          }}
        >
          Generate consultation
        </Button>
      </div>

      {consultationText && (
        <div className="pb-40">
          <div className="flex flex-col justify-center items-center">
            <p className="w-2/3 text-center">
              {consultationText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;