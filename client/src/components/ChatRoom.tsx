import { Chatbar } from "./Chatbar"
import IUser from "../types/user";
import IProfile from "../types/profile";
import * as Avatar from "@radix-ui/react-avatar"

interface ChatRoomProps {
  users: IUser[];
  profiles: IProfile[];
  recipient: { id: number | undefined , fullname: string , email: string, avatar: string | undefined };
}

export const ChatRoom = ({ users, profiles, recipient }: ChatRoomProps) => {

  



  return (
    <div className="h-screen flex-1 bg-dark-mauve-200 flex flex-col justify-between">
      <div className="w-full text-2xl p-2 bg-dark-mauve-500 flex items-center">
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
      <Chatbar/>
    </div>
  )
}
