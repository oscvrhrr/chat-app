import { createContext, useState, useEffect } from "react"
import IUser from "../../types/user";
import { socket } from "../../socket";


interface IUserContext {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext>({ user: undefined, setUser: () => {}});


interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  
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
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}
