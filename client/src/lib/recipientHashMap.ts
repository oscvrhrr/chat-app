import IProfile from "../types/profile";
import IUser from "../types/user";
import IRecipient from "../types/recipient";


export const recipientData = (users: IUser[], profiles: IProfile[]) => {
  
  const recipientHashMap: { [key: number]: IRecipient } = users.reduce(
    (acc, user) => {
      const profile = profiles.find((profile) => profile.userId === user.id);
  
      if (user?.id) {
        acc[user.id] = {
          userId: user.id,
          fullname: user.fullname,
          email: user.email,
          bio: profile?.bio,
          avatar: profile?.avatar,
        };
      }
      return acc;
    }, {} as { [key: number]: IRecipient }
  );
  
  const recipientArray = Object.values(recipientHashMap);
  return recipientArray
}
