import React, { createContext, useState } from "react";
import IProfile from "../../types/profile";



interface IProfileContext {
  profile: IProfile | undefined;
  setProfile: React.Dispatch<React.SetStateAction<IProfile>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<IProfileContext>({ profile: undefined, setProfile: () => {}});


interface IProfileContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContextProvider = ({ children }: IProfileContextProviderProps) => {
  const [profile, setProfile] = useState<IProfile>({ id: undefined, userId: undefined, bio: undefined, avatar: undefined});

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      { children }
    </ProfileContext.Provider>
  )
}