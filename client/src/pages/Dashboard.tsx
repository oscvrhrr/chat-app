import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"
import { ChatRoom } from "../components/ChatRoom"
import { useState, useEffect } from "react"
import { socket } from "../socket"
import { ConnectionState } from "../components/ConnectionState"
import { ConnectionManager } from "../components/ConnectionManager"




export const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

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
