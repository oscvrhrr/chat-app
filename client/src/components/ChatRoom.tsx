import { Chatbar } from "./Chatbar"

export const ChatRoom = () => {
  return (
    <div className="h-screen flex-1 bg-dark-mauve-200 flex flex-col justify-between">
      <div className="w-full h-12 text-2xl bg-dark-mauve-500 px-4 pt-2">
        Chat room
      </div>
      <Chatbar/>
    </div>
  )
}
