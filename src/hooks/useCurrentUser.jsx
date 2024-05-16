import { useState, useEffect } from 'react';
import instance from '../api';

const useCurrentUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("token") != "") {
      instance.get("/current_user", {
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
          setLoading(false);
        });
    }
  }, []);

  return { loading, user,setUser };
};

export default useCurrentUser;
