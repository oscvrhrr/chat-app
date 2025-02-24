import { AuthForm } from "../components/AuthForm";
import { useState } from "react";
export const Landing = () => {
  const [isRegistered, setIsRegistered] = useState(true);


  const handleToggle = (isToggled: boolean) => {
    setIsRegistered(isToggled);
  }



  return (
    <div className="bg-dark-mauve-200 h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-white">Chat App</h1>
      {
        !isRegistered
        ?
        <AuthForm
          title="Sign Up"
          segment="signup"
          toggle={() => handleToggle(true)}

        />
        :
        <AuthForm
          title="Login"
          segment="login"
          toggle={() => handleToggle(false)}
        />
      }
    </div>
  );
};
