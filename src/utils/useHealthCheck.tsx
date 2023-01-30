import axios from "axios";
import { useState, useEffect } from "react";

const useHealthCheck = () => {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (process.env.REACT_APP_HEALTH_CHECK) {
      axios
        .get(process.env.REACT_APP_HEALTH_CHECK)
        .then((res) => {if(res){setStatus("success")}})
        .catch((err) => {
          setStatus("failed");
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  return status;
};

export default useHealthCheck;
