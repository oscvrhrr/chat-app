import { useContext } from "react";
import IConversation from "../types/conversation"
import IRecipient from "../types/recipient";
import * as Avatar from "@radix-ui/react-avatar"
import { UserContext } from "./context/UserContext";
import IProfile from "../types/profile";
import { useRef, useEffect} from "react";


interface ConversationProps {
  conversation: IConversation[];
  recipient:  IRecipient;
  profiles: IProfile[];
}

const Conversation = ({ conversation, recipient, profiles }: ConversationProps) => {
  const { user } = useContext(UserContext);
  const userProfile = profiles.find((p) => p.id === user?.id)
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [conversation])


  return (
    <div className="overflow-y-auto flex flex-col justify-end py-14" >
      { conversation.map((msg, index) => (
          <div key={index} className="flex items-center mx-2 my-4" >
            <Avatar.Root  className="inline-flex mr-2 size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={ msg.userId === userProfile?.id ? userProfile.avatar : recipient.avatar}
              />
            </Avatar.Root>
            <div className="h-fit">
              <strong>@{msg.userId === user?.id ? user.fullname : recipient.fullname }:</strong>
              <p className="text-dark-mauve-1100">{msg.message}</p>
            </div>
          </div>
      ))}
      <div ref={bottomRef}/>
    </div>
  )
}

export default Conversation