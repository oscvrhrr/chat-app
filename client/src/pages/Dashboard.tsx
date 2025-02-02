import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"
import { ChatRoom } from "../components/ChatRoom"
import { useState, useEffect, useContext } from "react"
import { socket } from "../socket"
import { ConnectionState } from "../components/ConnectionState"
import { ConnectionManager } from "../components/ConnectionManager"
import { UserContext } from "../components/context/UserContext"
import axios from "axios"
import baseURL from "../config/config"



export const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { setUser } = useContext(UserContext);

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
