import React, { useContext, useState } from 'react';
import { socket } from '../socket';
import baseURL from '../config/config';
import axios from 'axios';
import { UserContext } from './context/UserContext';
import IConversation from '../types/conversation';

interface ChatbarProps {
  recipientId: number | undefined;
  setConversation: React.Dispatch<React.SetStateAction<IConversation[]>>;
}


export const Chatbar = ({ recipientId, setConversation }: ChatbarProps) => {
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {

      socket.emit("private-message", { message, sender: user?.id, recipient: recipientId });

      const saveMessageToDB = async() => {
        await axios({
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
      }
      saveMessageToDB();
      setConversation((prev) => [...prev, { id: 1, message, created: new Date().toISOString(), userId: user?.id || 0, conversationId: 1 }])
      setMessage('');
    }
  };



  return (
    <form 
      className="bg-dark-mauve-500 p-2 flex h-12 backdrop-blur-md w-full bottom-0 fixed"
      onSubmit={handleSubmit}
    >
      <input
        className="border-none p-2 w-3/5 rounded-full mx-1"
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

