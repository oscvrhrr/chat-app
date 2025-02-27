import { useEffect } from "react";
import IProfile from "../types/profile";
import IUser from "../types/user";
import UserCard from "./UserCard";

interface MenuProps {
  users: IUser[];
  profiles: IProfile[];
  setRecipient: React.Dispatch<
    React.SetStateAction<{
      id: number | undefined;
      fullname: string;
      email: string;
      avatar: string | undefined;
    }>
  >;
}

export const Menu = ({ users, profiles, setRecipient }: MenuProps) => {
  
  const handleUserCard = (user: IUser, avatar: string | undefined) => {
    setRecipient({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      avatar: avatar,
    });
  };

  useEffect(() => {
    if (users && users.length > 0) {
      // For example, pick the first user as the default recipient
      const firstUser = users[0];
      const profile = profiles.find((p) => p.id === firstUser.id);
      setRecipient({
        id: firstUser.id,
        fullname: firstUser.fullname,
        email: firstUser.email,
        avatar: profile?.avatar,
      });
    }
  }, [users, profiles, setRecipient]);

  const profileMap = profiles.reduce((map, profile) => {
    if (profile.id) {
      map[profile.id] = profile;
    }
    return map;
  }, {} as { [key: string]: IProfile });

  return (
    <div className="w-80 rounded text-white bg-dark-mauve-300 p-2 h-screen overflow-y-auto">
      {users &&
        users.map((user, index) => {
          const profile = user.id ? profileMap[user.id] : undefined;
          return (
            <UserCard
              handleRecipient={() => handleUserCard(user, profile?.avatar)}
              key={index}
              avatar={profile?.avatar}
            >
              <p className="pl-2">{user.fullname}</p>
              {/* <p>{ user.email }</p> */}
            </UserCard>
          );
        })}
    </div>
  );
};