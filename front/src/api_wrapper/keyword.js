import config from '../../config.json';

export async function getAllKeywords() {
  try {
    const cryptos = await fetch(`${config.api_url}/keywords`, {
      method: 'GET',
    });
    return await cryptos.json();
  } catch (e) {
    return { err: e };
  }
}
