import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"

import { ChatRoom } from "../components/ChatRoom"

export const Dashboard = () => {
  return (
   <div className="bg-dark-mauve-200 h-screen flex">
    <Sidebar/>
    <Menu/>
    <ChatRoom/>

   </div>
  )
}
