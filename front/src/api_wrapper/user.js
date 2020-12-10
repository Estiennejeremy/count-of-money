import config from '../../config.json';

export async function getUsernameById(userId) {
  try {
    const res = await fetch(`${config.api_url}/users/${userId}`, {
      method: 'GET',
    });
    const resUser = await res.json();
    return resUser.username;
  } catch (e) {
    return { err: e };
  }
}

export async function getUserById(userId) {
  try {
    const res = await fetch(`${config.api_url}/users/${userId}`, {
      method: 'GET',
    });
    return await res.json();
  } catch (e) {
    return { err: e };
  }
}

export async function getAdminUser() {
  try {
    const res = await fetch(
      `${config.api_url}/users/?filter=%7B%22where%22%3A%7B%22username%22%3A%22admin%22%7D%7D`,
      {
        method: 'GET',
      },
    );
    return await res.json();
  } catch (e) {
    return { err: e };
  }
}

export async function getUserRoleById(userId) {
  try {
    const res = await fetch(`${config.api_url}/users/${userId}`, {
      method: 'GET',
    });
    const resUser = await res.json();
    return resUser.role;
  } catch (e) {
    return { err: e };
  }
}
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

export async function editUser(user) {
  try {
    const res = await fetch(`${config.api_url}/users/profile`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (e) {
    return { error: e };
  }
}
