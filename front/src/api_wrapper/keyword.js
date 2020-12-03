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

export async function createKeyword(name) {
  try {
    const keyword = await fetch(`${config.api_url}/keywords/addIfNotExist`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await keyword.json();
  } catch (e) {
    return { err: e };
  }
}
