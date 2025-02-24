import axios from "axios";
import baseURL from "../config/config"
import { useNavigate } from "react-router";




const useDemo = () => {
 const inputValues = { email: "demo@gmail.com", password: "demopassword" }
  const navigate = useNavigate();

  const loginDemo = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/auth/login`,
        data: {
          email: inputValues.email,
          password: inputValues.password
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err)
    }
  }

  return { loginDemo }
}

export default useDemo;