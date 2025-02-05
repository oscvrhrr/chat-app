import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"
import { ChatRoom } from "../components/ChatRoom"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../components/context/UserContext"
import { ProfileContext } from "../components/context/ProfileContext"
import axios from "axios"
import baseURL from "../config/config"
import IUser from "../types/user"
import IProfile from "../types/profile"



export const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const[recipient, setRecipient] = useState<{ id: number | undefined , fullname: string , email: string, avatar: string | undefined }>({ id: undefined , fullname: "" , email: "", avatar: undefined });
  
  const { user, setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);

  useEffect(() => {
    const getAllProfiles = async() => {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/users/profiles`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProfiles(response.data.profiles)

      
    }
    getAllProfiles()
  }, [])

  useEffect(() => {
    const getAllUsers = async() => {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/users`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const output = response.data.users.filter((fetchedUser: IUser) => user?.id !== fetchedUser.id)
      setUsers(output)
    }

    getAllUsers()
  }, [user?.id])
  
 

  useEffect(() => {
    const getCurrentUserData = async() => {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/auth/me`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUser(response.data.user)
    } 
    getCurrentUserData()
  }, [setUser])

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
    getUserProfile()

  }, [setProfile, user?.id])


  return (
   <div className="bg-dark-mauve-200 h-screen flex">
    <Sidebar user={ user }/>
    <Menu setRecipient={ setRecipient } users={ users } profiles={ profiles }/>
    <ChatRoom recipient={ recipient } users={ users } profiles={ profiles } />
   </div>
  )
}
