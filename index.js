/* eslint-disable no-alert */
/* global hello */

let response;

const connect = () => {
  hello('connect').login()
    .then((res) => {
      response = res;
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
  const currentTime = (new Date()).getTime()/1000;

  return session && session.access_token && session.expires > currentTime;
};

const tokenValue = (session) => session.access_token;

const displayConnected = () => {
  document.querySelector('#message').classList.add('connected');
  document.querySelector('.avatar').classList.add('connected');
};

const displayDisconnected = () => {
  document.querySelector('.avatar').classList.remove('connected');
};

const sendData = () => {
  alert('send data');
};

const getData = () => {
  alert('get data');
};

const init = () => {
  const connectToken= hello('connect').getAuthResponse();

  const isConnected = online(connectToken);

  if (isConnected) {
    displayConnected();
  } else {
    displayDisconnected();
  }
};

init();
