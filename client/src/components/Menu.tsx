// import { useState, useEffect, useContext } from "react"
// import axios from "axios";
// import baseURL from "../config/config";
// import IUser from "../types/user";
import IProfile from "../types/profile";
import IUser from "../types/user";
import UserCard from "./UserCard";
// import { UserContext } from "./context/UserContext";

interface MenuProps {
  users: IUser[];
  profiles: IProfile[];
  setRecipient: React.Dispatch<React.SetStateAction<{ id: number | undefined , fullname: string , email: string, avatar: string | undefined}>> ;
}

export const Menu = ({ users, profiles, setRecipient }: MenuProps) => {

  const handleUserCard = (user: IUser, avatar: string | undefined) => {
    setRecipient({ id: user.id, fullname: user.fullname, email: user.email, avatar: avatar })
  }


  const profileMap = profiles.reduce((map, profile) => {
    if (profile.id) {
      map[profile.id] = profile;
    }
    return map;
  }, {} as { [key: string]: IProfile });


  return (
    <div className="w-80 rounded text-white bg-dark-mauve-300 p-2 h-screen overflow-y-auto">
        {/* {{
          users ? users.map((user, index) => (
            profiles.map((profile) => (

            <UserCard key={ index } avatar={ user.id === profile.id ? profile.avatar : undefined}>
              <p className="pl-2">{ user.fullname }</p>
              {/* <p>{ user.email }</p> */}
            {/* </UserCard> */}

            {/* ) ) */}
          {/* )) : null */}
        {/* }} */} 

        { users && users.map((user, index) => {
        const profile = user.id ? profileMap[user.id] : undefined;
        return (
          <UserCard handleRecipient={ () => handleUserCard(user, profile?.avatar) } key={index} avatar={profile?.avatar}>
            <p className="pl-2">{user.fullname}</p>
            {/* <p>{ user.email }</p> */}
          </UserCard>
        );
      })}


    </div>
  )
}
