/* eslint-disable no-alert */
/* global hello, config */
/* exported connect disconnect online tokenValue sendData getData */

let response;

const displayConnected = () => {
  document.querySelector('#message').classList.add('connected');
  document.querySelector('.avatar').classList.add('connected');
};

const displayDisconnected = () => {
  document.querySelector('.avatar').classList.remove('connected');
};

const connect = () => {
  hello('connect').login()
    .then((res) => {
      response = res;
      console.log(response);
      displayConnected();
    });
};

const disconnect = () => {
  hello('connect').logout()
    .then(() => {
      location.href = '/';
    }, (err) => {
      console.log(err);
      alert('You did not sign in :-)');
    });
};

const online = (session) => {
  const currentTime = (new Date()).getTime() / 1000;

  return session && session.access_token && session.expires > currentTime;
};

const tokenValue = (session) => session.access_token;
const connectURL = 'https://connect-project.io';

const userId = (accessToken) => {

  /*
  curl --request GET \
  --url $CONNECT_URL/oauth/user \
  --header 'Authorization: Bearer '$access_token

  Response:
  { "id": "xxxx" }
  */
  const testGet = new XMLHttpRequest();
  testGet.open('GET', `${connectURL}/oauth/user`);
  testGet.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  testGet.onreadystatechange = function () {
    if (testGet.readyState === 4) {
      console.log(testGet.status);
      console.log(testGet.responseText);
    }
  };
  testGet.send();
};

/*
const gameScore = (sessionToken, accessToken) => {

  const getScore = new XMLHttpRequest();
  getScore.open('GET', `${connectURL}/parse/classes/GameScore`);

  getScore.setRequestHeader('x-parse-application-id', 'connect');
  getScore.setRequestHeader('x-parse-session-token', `${sessionToken}`);
  getScore.setRequestHeader('Authorization', `Bearer ${accessToken}`);

  getScore.onreadystatechange = function () {
    if (getScore.readyState === 4) {
      console.log(getScore.status);
      console.log(getScore.responseText);
    }
  };
  getScore.send();
};
*/
const getData = () => {

  // alert(getData);
  const sessionInfo = hello('connect').getAuthResponse();
  const accessToken = sessionInfo.access_token;
  //const sessionToken = sessionInfo.session_state;
  userId(accessToken);
  //gameScore(sessionToken, accessToken);
};

const sendData = () => {
  const timeStamp = new Date();
  alert(timeStamp);

  /*
  const sessionInfo = hello('connect').getAuthResponse();
  const accessToken = sessionInfo.access_token;
  const objectId = userId(accessToken);
  const sendScore = new XMLHttpRequest();
  sendScore.open('GET', `${connectURL}/parse/classes/GameScore${objectId}`);

  sendScore.setRequestHeader('content-type', 'application/json');
  sendScore.setRequestHeader('x-parse-application-id', 'connect');
  sendScore.setRequestHeader('Authorization', `Bearer ${accessToken}`);

  sendScore.onreadystatechange = function () {
    if (sendScore.readyState === 4) {
      console.log(sendScore.status);
      console.log(sendScore.responseText);
    }
  };
  var data = `{
    "score":1338,
    "playerName":"sample",
    "cheatMode":false,
  }`;
  sendScore.send(data);
  */
};

const initHello = () => {
  // configure Connect network
  hello.init({ connect: config.connectOAuth });

  // listen to login changes
  hello.on('auth.login', (auth) => {
    hello(auth.network).api('me')
      .then(function (r) {
        console.log('response:', r);
        let label = document.getElementById('profile_' + auth.network);
        if (!label) {
          label = document.createElement('div');
          label.id = 'profile_' + auth.network;
          document.getElementById('profile').appendChild(label);
        }
        label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
      });
  });

  // configure client
  hello.init({
    connect: config.clientId
  }, {
    /* eslint-disable camelcase */
    oauth_proxy: config.oauthProxy,
    redirect_uri: config.redirectURI
    /* eslint-enable camelcase */
  });
};

const init = () => {
  initHello();

  const connectToken = hello('connect').getAuthResponse();

  const isConnected = online(connectToken);

  if (isConnected) {
    displayConnected();
  } else {
    displayDisconnected();
  }
};

init();
