import React, { useState } from 'react';

export const Chatbar = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log(message);
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

