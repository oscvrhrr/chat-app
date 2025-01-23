import { Button } from "@radix-ui/themes"
import { ChatBubbleIcon, MagnifyingGlassIcon, ExitIcon, GearIcon, GlobeIcon } from "@radix-ui/react-icons"

export const Sidebar = () => {
  return (
    <div className="text-white flex flex-col justify-between h-screen w-36 p-3">
      <div className="flex flex-col p-1">
        <Button className="hover:bg-dark-mauve-600 text-dark-mauve-1100"  variant="ghost" size="3">
          <ChatBubbleIcon/>Chats
        </Button>
        <Button className="hover:bg-dark-mauve-600 text-dark-mauve-1100 my-1" variant="ghost" size="3">
          <GlobeIcon/>Groups
        </Button>
        <Button className="hover:bg-dark-mauve-600 text-dark-mauve-1100" variant="ghost" size="3">
          <MagnifyingGlassIcon/>Search
        </Button>
      </div>
      <div className="flex flex-col pl-1">
        <Button className="hover:bg-dark-mauve-600 text-dark-mauve-1100 my-1" variant="ghost" size="3">
          <GearIcon/>Settings
        </Button>
        <Button className="hover:bg-dark-mauve-600 text-dark-mauve-1100" variant="ghost" size="3">
          <ExitIcon/>Logout
        </Button>  
      </div>
    </div>
  )
}
