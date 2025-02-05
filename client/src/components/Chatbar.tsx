import React, { useState } from 'react';
import { socket } from '../socket';
import baseURL from '../config/config';
import axios from 'axios';

interface ChatbarProps {
  recipientId: number | undefined;
}


export const Chatbar = ({ recipientId }: ChatbarProps) => {
  const [message, setMessage] = useState('');
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("private-message", { message, to: recipientId });
      const saveMessageToDB = async() => {
        const response = await axios({
          method: "POST",
          url: `${baseURL}/conversations`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            message,
            recipientId,
          }
        })
        console.log(response.data);
      }
      saveMessageToDB();
      setMessage('');
    }
  };





  return (
    <form 
      className="bg-dark-mauve-500 p-2 flex h-12 backdrop-blur-md"
      onSubmit={handleSubmit}
    >
    

      <input
        className="border-none p-2 flex-grow rounded-full mx-1"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button 
        className="bg-gray-700 border-none p-2 mx-1 rounded text-white"
        type="submit"
      >
        Send
      </button>
      
    </form>
  );
};

