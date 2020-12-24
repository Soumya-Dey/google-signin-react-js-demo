import { useState, useEffect } from "react";
import * as queryString from "query-string";

import "./App.css";
import env from './env'

function App() {
  useEffect(() => {
    generateAndSetUrl();
  }, [])

  const [glUrl, setGlUrl] = useState(null);
  const [fbUrl, setFbUrl] = useState(null);

  const generateAndSetUrl = () => {
    const paramsForGoogle = queryString.stringify({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: "http://localhost:3000/auth/google",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "), // space seperated string
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });

    const paramsForFacebook = queryString.stringify({
      client_id: env.FACEBOOK_APP_ID,
      redirect_uri: "http://localhost:3000/auth/facebook",
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
    });
    
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${paramsForGoogle}`;
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${paramsForFacebook}`;
  
    setGlUrl(googleLoginUrl);
    setFbUrl(facebookLoginUrl);
  }

  return <div className="App">
    <a className="gl-signin" href={glUrl}>Sign In with Google</a>
    <a className="fb-signin" href={fbUrl}>Sign In with Facebook</a>
  </div>;
}

export default App;
