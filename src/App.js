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
      state: "http://subdomain.localhost:3000/auth/google",
      redirect_uri: "http://localhost:3000/auth/google",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "), // space seperated string
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });

    // const paramsForFacebook = queryString.stringify({
    //   client_id: env.FACEBOOK_APP_ID,
    //   state: "http://subdomain.localhost:3000/auth/google",
    //   redirect_uri: "http://localhost:3000/auth/facebook",
    //   scope: ['email', 'user_friends'].join(','), // comma seperated string
    //   response_type: 'code',
    //   auth_type: 'rerequest',
    // });

    const paramsForFacebook = queryString.stringify({
      client_id: env.FACEBOOK_APP_ID,
      state: "http://subdomain.localhost:3000/auth/google",
      redirect_uri: "http://localhost:3000/auth/facebook",
      scope: ['user_posts', 'pages_show_list', 'pages_messaging_subscriptions', 'pages_manage_metadata', 'pages_read_engagement', 'pages_manage_posts', 'public_profile'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
    });
    
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${paramsForGoogle}`;
    const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?${paramsForFacebook}`;

    setGlUrl(googleLoginUrl);
    setFbUrl(facebookLoginUrl);
  }

  return <div className="App">
    <a className="gl-signin" href={glUrl}>Sign In with Google</a>
    <a className="fb-signin" href={fbUrl}>Connect Facebook Page</a>
  </div>;
}

export default App;
