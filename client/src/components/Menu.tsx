import IProfile from "../types/profile";
import IUser from "../types/user";
import IRecipient from "../types/recipient";
import UserCard from "./UserCard";
import { recipientData } from "../lib/recipientHashMap";
import { useMemo, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import baseURL from "../config/config";
import { IConversationData } from "../types/conversationData";
import { getRecipientsInConversations } from "../lib/getRecipientsInConversation";
import { Heading } from "@radix-ui/themes";


interface MenuProps {
  users: IUser[];
  profiles: IProfile[];
  setRecipient: React.Dispatch<React.SetStateAction<IRecipient>>;
  isButtonPressed: "chats" | "groups" | "search" | "settings";
}

export const Menu = ({ users, profiles, setRecipient, isButtonPressed }: MenuProps) => {
  const { data: conversationData } = useApi<IConversationData[]>("GET", `${baseURL}/conversations`, "conversations");
  const recipientArray = useMemo(() => recipientData(users, profiles), [users, profiles]);
  const filteredArray = useMemo(() => {
    if (!conversationData) return [];
    return getRecipientsInConversations(conversationData, recipientArray);
  }, [conversationData, recipientArray]);

  

  useEffect(() => {
    if (recipientArray.length > 0) {
      setRecipient(recipientArray[0]);
    }
  }, [recipientArray, setRecipient]);

  
 

  return (
    <div className="w-80 rounded text-white bg-dark-mauve-300 p-2 h-screen overflow-y-auto">
      <Heading className="mt-2">{isButtonPressed === 'search' ? "Search all users": "Chats"}</Heading>
      {isButtonPressed === "search" && recipientArray.map((recipient) => (
        <UserCard
          key={recipient.userId}
          avatar={recipient.avatar}
          handleRecipient={() => {
            setRecipient(recipient);
          }}
        >
          <p>{recipient.fullname}</p>
        </UserCard>
      ))}
      { isButtonPressed === "chats" && filteredArray.map((recipient) => (
        <UserCard
          key={recipient.userId}
          avatar={recipient.avatar}
          handleRecipient={() => {
            setRecipient({
              ...recipient,
              avatar: recipient.avatar || ''
            })
          }}
        >
          <p>{recipient.fullname}</p>
        </UserCard>
      ))}
    </div>
  );
};
