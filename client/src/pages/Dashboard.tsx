import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"
import { ChatRoom } from "../components/ChatRoom"
import { useState, useEffect, useContext } from "react"
import { socket } from "../socket"
import { ConnectionState } from "../components/ConnectionState"
import { ConnectionManager } from "../components/ConnectionManager"
import { UserContext } from "../components/context/UserContext"
import { ProfileContext } from "../components/context/ProfileContext"
import axios from "axios"
import baseURL from "../config/config"



export const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { user, setUser } = useContext(UserContext);
  const { setProfile } = useContext(ProfileContext);
  


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    
    function onDisconnect() {
      setIsConnected(false);
    }


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, []);

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
    <Sidebar/>
    <Menu/>
    <ChatRoom/>
    <ConnectionState isConnected={ isConnected }/>
    <ConnectionManager/>
   </div>
  )
}
