import { Sidebar } from "../components/Sidebar"
import { Menu } from "../components/Menu"

export const Dashboard = () => {
  return (
   <div className="bg-dark-mauve-200 h-screen flex">
    <Sidebar/>
    <Menu/>


   </div>
  )
}
