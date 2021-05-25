import { useState, useEffect } from "react";
import * as queryString from "query-string";
import axios from 'axios';

import "./App.css";
import env from './env'

function App() {
  useEffect(() => {
    generateAndSetUrl();
  }, [])

  const [glUrl, setGlUrl] = useState(null);
  const [fbUrl, setFbUrl] = useState(null);
  const [twUrl, setTwUrl] = useState(null);

  const generateAndSetUrl = async () => {
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
      scope: [
        'public_profile', 
        'email',
        'pages_show_list', 
        'pages_read_engagement',
        'pages_read_user_content', 
        'pages_manage_engagement',
        'pages_manage_metadata', 
      ].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
    });
    console.log(paramsForFacebook);
    
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${paramsForGoogle}`;
    const facebookLoginUrl = `https://www.facebook.com/v9.0/dialog/oauth?${paramsForFacebook}`;

    setGlUrl(googleLoginUrl);
    setFbUrl(facebookLoginUrl);

    const authToken = '3428735825';
    const subdomainUrl = 'https://abc.example.com'

    // send query params separately
    const {data: twitterLoginUrl} = await axios({
      url: `http://localhost:7001/channel/twitter/url?authToken=${authToken}&subdomainUrl=${subdomainUrl}`,
      method: 'get',
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWQiOiI2MDdhOWRiYjE3NTY2MDE4ZWM1YzZmNDkiLCJjbGllbnRJZCI6IjYwN2E5ZGI4MTc1NjYwMThlYzVjNmYzYiIsInJvbGUiOiJvd25lciJ9LCJpYXQiOjE2MjE3ODc4NDgsImV4cCI6MTYyMjY1MTg0OH0.AcXzVZoWau1lm-tKVn6cr9SX8XIOoAhMjsZQ0JnWtjk',
      },
    });
    setTwUrl(twitterLoginUrl.authorizeUrl)
  }

  return <div className="App">
    <a className="gl-signin" href={glUrl}>Sign In with Google</a>
    <a className="fb-signin" href={fbUrl}>Connect Facebook Page</a>
    <a className="tw-signin" href={twUrl}>Sign In with Twitter</a>
  </div>;
}

export default App;
