import { useState, useEffect, useContext } from "react"
import axios from "axios";
import baseURL from "../config/config";
import IUser from "../types/user";
import IProfile from "../types/profile";
import UserCard from "./UserCard";
import { UserContext } from "./context/UserContext";

export const Menu = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getAllUsers = async() => {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/users`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const output = response.data.users.filter((fetchedUser: IUser) => user?.id !== fetchedUser.id)
      setUsers(output)
    }

    getAllUsers()
  }, [user?.id])

  useEffect(() => {
    const getAllProfiles = async() => {
      const response = await axios({
        method: "GET",
        url: `${baseURL}/users/profiles`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      setProfiles(response.data.profiles)

      
    }
    getAllProfiles()
  }, [])


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

        {users.map((user, index) => {
        const profile = profileMap[user.id];
        return (
          <UserCard key={index} avatar={profile?.avatar}>
            <p className="pl-2">{user.fullname}</p>
            {/* <p>{ user.email }</p> */}
          </UserCard>
        );
      })}


    </div>
  )
}
