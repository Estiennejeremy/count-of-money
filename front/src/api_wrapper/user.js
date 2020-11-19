import config from '../../config.json';

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

export async function githubOauth(data) {
  try {
    const res = await fetch(`${config.api_url}/users/auth/github`, {
      method: 'POST',
      body: JSON.stringify({
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        code: data.code,
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

export async function githubOauthCallback(accessToken) {
  try {
    const res = await fetch(`${config.api_url}/users/auth/github/callback`, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: accessToken,
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