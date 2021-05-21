import React, { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import axios from 'axios';

const Auth = () => {
  const [code, setCode] = useState(null);
  const [token, setToken] = useState(null);
  const [verifier, setVerifier] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState([]);
  const [data, setUserData] = useState(null);
  const [signInMethod, setSignInMethod] = useState('password');

  const setData = (data) => {
    const fbPages = data.company.facebookPages;
    setInfo(fbPages);
  };

  useEffect(() => {
    getCodeFromUrl();

    const connectPage = async () => {
      // if (code) {
      if (token && verifier) {
        try {
          const { data } = await axios({
            // url: `http://localhost:7001/channel/facebook/access?method=${signInMethod}&code=${code}`,
            // url: `http://localhost:7001/channel/facebook/connect?method=${signInMethod}&code=${code}`,
            // url: `http://localhost:7001/auth/login/social/607a9db817566018ec5c6f3b?method=${signInMethod}&code=${code}`,
            url: `http://localhost:7001/channel/twitter/access?oauth_token=${token}&oauth_verifier=${verifier}`,
            // method: 'post',
            method: 'get',
            // headers: {
            //   'auth-token':
            //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWQiOiI2MDhmZDM3ZTE0MjFlNDA3NDg0MTIyMDYiLCJjbGllbnRJZCI6IjYwN2E5ZGI4MTc1NjYwMThlYzVjNmYzYiIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MjAwMzg4NjMsImV4cCI6MTYyMDkwMjg2M30.__3m5LlO5_HnSnQRGMeyma9CazoBE-fCI3fJx3hSeLo',
            // },
            // data: {
            //   tokenId: '601ff59ee760c329dc416b62',
            // },
          });
          console.log(data);

          // setData(data);
          setUserData(data);
        } catch (error) {
          setError(error.response.data.errors[0].msg);
        }
      }
    };
    connectPage();
  }, [code, token, verifier, signInMethod]);

  const getCodeFromUrl = () => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
      setError(urlParams.error);
    } else {
      setCode(urlParams.code);
      setToken(urlParams.oauth_token);
      setVerifier(urlParams.oauth_verifier);

      if (window.location.pathname === '/auth/google')
        setSignInMethod('google');
      else if (window.location.pathname === '/auth/facebook')
        setSignInMethod('facebook');
      else if (window.location.pathname === '/auth/twitter')
        setSignInMethod('twitter');
      else setSignInMethod('password');
    }
  };

  const connect = async () => {
    try {
      const { data } = await axios({
        // url: `http://localhost:7001/channel/facebook/access?method=${signInMethod}&code=${code}`,
        // url: `http://localhost:7001/channel/facebook/disconnect?method=${signInMethod}&code=${code}`,
        // url: `http://localhost:7001/auth/login/social/607a9db817566018ec5c6f3b?method=${signInMethod}&code=${code}`,
        url: `http://localhost:7001/channel/twitter/access?oauth_token=${token}&oauth_verifier=${verifier}`,
        // method: 'post',
        method: 'get',
        // headers: {
        //   'auth-token':
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWQiOiI2MDhmZDM3ZTE0MjFlNDA3NDg0MTIyMDYiLCJjbGllbnRJZCI6IjYwN2E5ZGI4MTc1NjYwMThlYzVjNmYzYiIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MjAwMzg4NjMsImV4cCI6MTYyMDkwMjg2M30.__3m5LlO5_HnSnQRGMeyma9CazoBE-fCI3fJx3hSeLo',
        // },
        // data: {
        //   pageIds: ['365099807847098'],
        // },
      });

      console.log(data);

      setData(data);
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

  const userInfoDOM = [];
  for (const name in data) {
    userInfoDOM.push(
      <p key={name}>
        <b>{name}:</b> {data[name].toString()}
      </p>
    );
  }

  return (
    <div className='App'>
      <a className='bk-btn' href='/'>
        Go Back
      </a>
      {error && <div>{error}</div>}
      {data ? <div>{userInfoDOM}</div> : <div>Loading...</div>}
      {/* {info.length ? (
        <div>
          Pages:
          {info.map((item, i) => (
            <p key={i}>{item.name || 'Unknown page'}</p>
          ))}
          <button className='bk-btn' onClick={connect}>
            connect
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )} */}
    </div>
  );
};

export default Auth;
