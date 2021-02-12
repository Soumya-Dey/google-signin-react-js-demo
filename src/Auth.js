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

    const fetUserInfo = async () => {
      if (code) {
        const { data } = await axios({
          url: `http://localhost:8000/auth/login/social/601c13682a018714f4d63bdb?method=${signInMethod}&code=${code}`,
          method: 'POST',
          // data: {
          //   tokenId: '601ff59ee760c329dc416b62',
          // },
        });
        console.log(data);
        setUserInfo(data);
      }
    };
    fetUserInfo();
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
