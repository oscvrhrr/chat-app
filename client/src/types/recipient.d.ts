
interface IRecipient {
  userId: number | undefined;
  fullname: string;
  email: string;
  bio?: string | undefined;
  avatar: string | undefined;
}


export default IRecipient