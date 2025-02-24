import * as Form from "@radix-ui/react-form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import baseURL from "../config/config";

interface AuthFormProps {
  title: string;
  segment: string;
  toggle: () => void;
}


export const AuthForm = ({ title, segment, toggle }: AuthFormProps) => {
  const [inputValues, setInputValues] = useState({fullname: "", email: "", password: ""});
  const navigate = useNavigate();

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({...prevState, [name]: value}))
  }
  

  const login = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data: { fullname?: string; email: string; password: string } = {
        email: inputValues.email,
        password: inputValues.password,
      };

      if (title === "Sign Up") {
        data.fullname = inputValues.fullname;
      }

      const response = await axios({
        method: "POST",
        url: `${baseURL}/auth/${segment}`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
   
  }



  return (
    <>
      <Form.Root
        onSubmit={login}
        className="w-[330px] h-[400px] border border-dark-mauve-700 p-9 rounded-lg bg-dark-mauve-300"
      >
        <h2 className="text-center text-2xl font-bold">{ title }</h2>
        { title === "Sign Up" 
          && 
        (  <Form.Field className="mb-2.5 grid" name="fullname">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Fullname
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="valueMissing"
            >
              Please provide your fullname
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border bg-dark-mauve-200 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              placeholder="Enter your fullname"
              type="text"
              required
              onChange={handleInputValues}
              value={inputValues.fullname}
            />
          </Form.Control>
        </Form.Field>)
        }
        <Form.Field className="mb-2.5 grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Email
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="valueMissing"
            >
              Please enter your email
            </Form.Message>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="typeMismatch"
            >
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border bg-dark-mauve-200 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              placeholder="Enter your email address"
              type="email"
              required
              onChange={handleInputValues}
              value={inputValues.email}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Password
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="valueMissing"
            >
              Please enter a password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border bg-dark-mauve-200 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              placeholder="Enter your password"
              type="password"
              required
              onChange={handleInputValues}
              value={inputValues.password}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="mt-2.5 bg-dark-mauve-1000 text-white box-border inline-flex h-[35px] w-full items-center justify-center rounded px-[15px] font-medium leading-none text-violet11  hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            {title}
          </button>
        </Form.Submit>
      </Form.Root>
      <p className="cursor-pointer" onClick={toggle}>
        { title === 'Sign Up' ? "Already have an account? Login here!" : "Don't have an account? Register here!" }
      </p>
    </>
  );
};
