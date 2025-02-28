import { UserContext } from "../components/context/UserContext"
import { useState, useEffect, useContext } from "react"
import { useApi } from "../hooks/useApi"
import { ProfileContextProvider } from "../components/context/ProfileContext"
import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"
import { ChatRoom } from "../components/ChatRoom"
import SettingsForm from "../components/Settings"

import axios from "axios"
import baseURL from "../config/config"
import IUser from "../types/user"
import IProfile from "../types/profile"
import IRecipient from "../types/recipient"



export const Dashboard = () => {
  const[recipient, setRecipient] = useState<IRecipient>({ userId: undefined , fullname: "" , email: "", bio: "", avatar: undefined });
  const [profile, setProfile] = useState<IProfile>({ id: undefined, userId: undefined, bio: undefined, avatar: undefined});
  const [isButtonPressed, setIsButtonPressed] = useState<"chats" | "groups" | "search" | "settings">("search");
  const { data: profilesData } = useApi<IProfile[]>("GET", `${baseURL}/users/profiles`, "profiles");
  const { data: userData } = useApi<IUser[]>("GET", `${baseURL}/users`, "users");
  const { user } = useContext(UserContext);

  


  useEffect(() => {
    const getUserProfile = async() => {
      if(!user?.id) return;
      const response = await axios({
        method: "GET",
        url: `${baseURL}/users/${user?.id}/profile`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProfile(response.data.profile)
    }
    if (user?.id) {
      getUserProfile();
    }
  }, [user?.id])




  return (
    <div className="bg-dark-mauve-200 h-screen flex">
      <ProfileContextProvider value={{ profile, setProfile }}>
        <Sidebar user={user} setIsButtonPressed={setIsButtonPressed} />
        {(isButtonPressed === "chats" || isButtonPressed === "search") && (
          <>
            <Menu
              setRecipient={setRecipient}
              users={userData || []}
              profiles={profilesData || []}
              isButtonPressed={isButtonPressed}
            />
            <ChatRoom
              recipient={recipient}
              users={userData || []}
              profiles={profilesData || []}
            />
          </>
        )}
        {isButtonPressed === "settings" && <SettingsForm />}
      </ProfileContextProvider>
    </div>
  );
}
