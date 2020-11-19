import config from '../../config.json';
// import Cookies from 'js-cookie';

// const userToken = Cookies.get('token');

export async function createUser(userData) {
  try {
    const res = await fetch(`${config.api_url}/users/register`, {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}

export async function logInUser(userData) {
  try {
    const res = await fetch(`${config.api_url}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}
