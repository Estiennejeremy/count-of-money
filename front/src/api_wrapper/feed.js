import config from '../../config.json';

export async function getAllFeeds() {
  try {
    const feeds = await fetch(`${config.api_url}/feeds`, {
      method: 'GET',
    });
    return await feeds.json();
  } catch (e) {
    return { err: e };
  }
}

export async function deleteCryptoById(feedId) {
  try {
    const res = await fetch(`${config.api_url}/feeds/${feedId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (e) {
    return { err: e };
  }
}
