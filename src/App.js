import { useState, useEffect } from "react";
import * as queryString from "query-string";

import "./App.css";
import env from './env'

function App() {
  useEffect(() => {
    generateAndSetUrl();
  }, [])

  const [url, setUrl] = useState(null);

  const generateAndSetUrl = () => {
    const stringifiedParams = queryString.stringify({
      client_id: env.CLIENT_ID,
      redirect_uri: "http://localhost:3000/auth/google",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "), // space seperated string
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });
  
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

    setUrl(googleLoginUrl);
  }

  return <div className="App">
    <a href={url}>Sign In with Google</a>
  </div>;
}

export default App;
