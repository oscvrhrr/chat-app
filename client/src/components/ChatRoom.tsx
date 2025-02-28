import * as Avatar from "@radix-ui/react-avatar"
import { Chatbar } from "./Chatbar"
import IUser from "../types/user";
import IProfile from "../types/profile";
import IRecipient from "../types/recipient";
import IConversation from "../types/conversation";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import baseURL from "../config/config";
import Conversation from "./Conversation";


interface ChatRoomProps {
  users: IUser[];
  profiles: IProfile[];
  recipient: IRecipient;
}


export const ChatRoom = ({ profiles, recipient }: ChatRoomProps) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<{ message: string, from: string }[]>([]);
  const [conversation, setConversation] = useState<IConversation[]>([]);
  

  useEffect(() => {
    setConversation([]);
    setMessages([]);

    if(recipient && recipient.userId) {
      const getMessagesFromDB = async() => {
        const response = await axios({
          method: "GET",
          url: `${baseURL}/conversations/messages`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          params: {
            recipientId: recipient.userId
          }
        })
        setConversation(response.data.messages)
      }
      getMessagesFromDB()
    }

  }, [recipient]);
  
  useEffect(() => {

    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
      socket.emit("register", user?.id)
    });
  
    socket.on("private-message", ({ message, sender }) => {
      console.log(`Received message: ${message} from: ${sender}`);
      setConversation((prev) => [...prev, { id: 1, message, created: new Date().toISOString(), userId: sender.id, conversationId: 1 }])
      // setMessages((prevMessages) => [...prevMessages, { message, from }])

    })

    return () => {
      socket.off('connect');
      socket.off('private-message');
    };

  }, [user])


  return (
    <div className="flex-1 bg-dark-mauve-200 flex flex-col h-screen overflow-y-auto">
      <div className="w-full text-2xl p-2 bg-dark-mauve-500 flex items-center fixed">
        <Avatar.Root className="inline-flex mr-2 size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
        <Avatar.Image
          className="size-full rounded-[inherit] object-cover"
          src={recipient.avatar}
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
        </Avatar.Root>
      <h3 className="bold mr-4">{recipient.fullname}</h3>
      </div>
      <div>
        <Conversation profiles={profiles} recipient={recipient} conversation={ conversation }/>
        {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.from}:</strong> {msg.message}
            </div>
          ))}
      </div>
      <Chatbar setConversation={setConversation} recipientId={ recipient.userId }/>
    </div>
  )
}
