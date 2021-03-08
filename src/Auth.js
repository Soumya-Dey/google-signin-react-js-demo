import React, { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import axios from 'axios';

const Auth = () => {
  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [signInMethod, setSignInMethod] = useState('password');

  useEffect(() => {
    getCodeFromUrl();

    const connectPage = async () => {
      if (code) {
        const { data } = await axios({
          url: `http://localhost:7001/channel/facebook/connect?method=${signInMethod}&code=${code}`,
          method: 'post',
          headers: {
            'auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb24iOnsiaWQiOiI2MDIyYWQzYjUxZjYyMTNhZmNmM2EyZDkiLCJjbGllbnRJZCI6IjYwMWMxMzY4MmEwMTg3MTRmNGQ2M2JkYiIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MTUyMTkwMTcsImV4cCI6MTYxNjA4MzAxN30.8lD7hCRdsq2bIMmtsuynUx_mIMxnc7nhPol02x_VDB4',
          },
          // data: {
          //   tokenId: '601ff59ee760c329dc416b62',
          // },
        });
        console.log(data);
        setUserInfo(data);
      }
    };
    connectPage();
  }, [code, signInMethod]);

  const getCodeFromUrl = () => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
      setError(urlParams.error);
    } else {
      setCode(urlParams.code);

      if (window.location.pathname === '/auth/google')
        setSignInMethod('google');
      else if (window.location.pathname === '/auth/facebook')
        setSignInMethod('facebook');
      else setSignInMethod('password');
    }
  };

  const userInfoDOM = [];
  for (const name in userInfo) {
    userInfoDOM.push(
      <p key={name}>
        <b>{name}:</b> {userInfo[name].toString()}
      </p>
    );
  }

  return (
    <div className='App'>
      <a className='bk-btn' href='/'>
        {'<'} Back
      </a>
      {error && <div>{error}</div>}
      {userInfo ? <div>{userInfoDOM}</div> : <div>Loading...</div>}
    </div>
  );
};

export default Auth;
