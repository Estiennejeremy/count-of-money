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

export async function deleteFeedById(feedId) {
  try {
    const res = await fetch(`${config.api_url}/feeds/${feedId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (e) {
    return { err: e };
  }
}

export async function createFeed(data, keywordId) {
  try {
    const feed = await fetch(`${config.api_url}/feeds/addIfNotExist`, {
      method: 'POST',
      body: JSON.stringify({
        url: data.url,
        keywords: [keywordId],
        params: {
          title: data.titleCorresp,
          url: data.urlCorresp,
          summary: data.summaryCorresp,
          date: data.dateCorresp,
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await feed.json();
  } catch (e) {
    return { err: e };
  }
}
