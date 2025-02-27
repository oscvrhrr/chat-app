import { createContext, useState, useEffect } from "react"
import { socket } from "../../socket";
import IUser from "../../types/user";
import baseURL from "../../config/config";
import axios from "axios";


interface IUserContext {
  user: IUser | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext>({ user: undefined });


interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

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
    if (user) {
      socket.connect();
      console.log('socket connected')

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user }}>
      { children }
    </UserContext.Provider>
  )
}
