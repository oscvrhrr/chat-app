import { useState, useEffect, useContext } from "react"
import axios from "axios";
import baseURL from "../config/config";
import IUser from "../types/user";
import UserCard from "./UserCard";
import { UserContext } from "./context/UserContext";

export const Menu = () => {
  const [users, setUsers] = useState<IUser[]>([]);
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





  return (
    <div className="w-80 rounded text-white bg-dark-mauve-300 p-2">
        {
          users ? users.map((user, index) => (
            <UserCard key={ index }>
              <p className="pl-2">{ user.fullname }</p>
              {/* <p>{ user.email }</p> */}
            </UserCard>
          )) : null
        }


    </div>
  )
}
