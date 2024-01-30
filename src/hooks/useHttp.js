import { useCallback } from "react";

const useHttp = () => {
  const fetchRequest = useCallback(async (req = {}) => {
    try {
      const token = localStorage.getItem("token");
      // const userName = localStorage.getItem("userName");
  
      const response = await fetch(`http://localhost:5000/${req.endPoint}`,{
        method: req.method || 'GET',
        body: req.body ? JSON.stringify(req.body) : null,
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error,"custom hook")
        throw (error.message);
      }
      const data = await response.json();
      return data;
      
    } catch (error) {
      throw (error);
    }
  }, []); 

  return fetchRequest;
};

export default useHttp;