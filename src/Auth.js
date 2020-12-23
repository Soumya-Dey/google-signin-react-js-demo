import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import axios from "axios";

const Auth = () => {
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getToken();

    const fetUserInfo = async () => {
      if (code) {
        const { data } = await axios({
          url: `http://localhost:5000/user/signin?code=${code}`,
          method: "GET",
        });

        console.log(data);
        setUserInfo(data);
      }
    };

    fetUserInfo();
  }, [code]);

  const getToken = () => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
      setError(urlParams.error);
    } else {
      setCode(urlParams.code);
    }
  };
  return (
    <div>
      <a href="/">{"<"} go back</a>
      {error && <div>{error}</div>}
      {userInfo && <div>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <p>isEmailVerified: {userInfo.verified_email.toString()}</p>
      </div> }
    </div>
  );
};

export default Auth;
