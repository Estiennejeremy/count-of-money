import config from '../../config.json';

export async function getUserIdByToken(token) {
  try {
    const tokenData = await fetch(
      `${config.api_url}/tokens?filter=%7B%22where%22%3A%7B%22token%22%3A%22${token}%22%7D%7D`,
    );
    return (await tokenData.json())[0].fk_user_id;
  } catch (e) {
    return {err: e};
  }
}
