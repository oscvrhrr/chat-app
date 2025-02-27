import { Button } from "@radix-ui/themes"
import { ChatBubbleIcon, MagnifyingGlassIcon, ExitIcon, GearIcon, GlobeIcon } from "@radix-ui/react-icons"
import * as Avatar from "@radix-ui/react-avatar"
import { useNavigate } from "react-router"
import { ProfileContext } from "./context/ProfileContext"
import { useContext } from "react"
import IUser from "../types/user"
import { socket } from "../socket"

interface SidebarProps {
  user: IUser | undefined;
  setIsButtonPressed: React.Dispatch<React.SetStateAction<"chats" | "groups" | "search" | "settings">>
}
export const Sidebar = ({ user, setIsButtonPressed } : SidebarProps) => {
  const { profile, } = useContext(ProfileContext);
  const navigate = useNavigate()


  const logout = () => {
    localStorage.removeItem("token")
    socket.disconnect()
    navigate("/")
  } 

  const handleButtons = (
    event: React.MouseEvent<HTMLButtonElement>,
    buttonPressed: "chats" | "groups" | "search" | "settings"
  ) => {
    event.preventDefault();
    setIsButtonPressed(buttonPressed);
  };



  return (
    <div className="text-white flex flex-col justify-between h-screen w-40 p-3">
      <div className="flex flex-col p-1">
        <div className="flex items-center justify-around">
          <Avatar.Root className="inline-flex size-[45px] select-none items-center mb-4 justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src={profile?.avatar}
              alt="Colm Tuite"
            />
            <Avatar.Fallback
              className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
              delayMs={600}
            >
              CT
            </Avatar.Fallback>
          </Avatar.Root>
          <p className="mb-3 font-bold">@{user?.fullname}</p>
        </div>
        <Button
          className="hover:bg-dark-mauve-600 text-dark-mauve-1100"
          variant="ghost"
          size="3"
          onClick={(event) => handleButtons(event, "chats")}

        >
          <ChatBubbleIcon />
          Chats
        </Button>
        <Button
          className="hover:bg-dark-mauve-600 text-dark-mauve-1100 my-1"
          variant="ghost"
          size="3"
          onClick={(event) => handleButtons(event, "groups")}
        >
          <GlobeIcon />
          Groups
        </Button>
        <Button
          className="hover:bg-dark-mauve-600 text-dark-mauve-1100"
          variant="ghost"
          size="3"
          onClick={(event) => handleButtons(event, "search")}
        >
          <MagnifyingGlassIcon />
          Search
        </Button>
      </div>
      <div className="flex flex-col pl-1">
        <Button
          className="hover:bg-dark-mauve-600 text-dark-mauve-1100 my-1"
          variant="ghost"
          size="3"
          onClick={(event) => handleButtons(event, "settings")}
        >
          <GearIcon />
          Settings
        </Button>
        <Button
          onClick={logout}
          className="hover:bg-dark-mauve-600 text-dark-mauve-1100"
          variant="ghost"
          size="3"
        >
          <ExitIcon />
          Logout
        </Button>
      </div>
    </div>
  );
}
