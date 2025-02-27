import axios from "axios";
import { useState, useEffect } from "react";




export const useApi = <T extends object>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, property: string) => {
  const [data, setData] = useState<T>()


  useEffect(() => {
    const apiCall = async() => {
      const response = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
      setData(response.data[property]);
    }
    apiCall();

  }, [method, url, property]);


  return {data}
}