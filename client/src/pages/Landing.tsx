import { Login } from "../components/Login";

export const Landing = () => {
  return (
    <div className="bg-dark-mauve-200 h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-white">Chat App</h1>
      <Login/>
    </div>
  );
};
