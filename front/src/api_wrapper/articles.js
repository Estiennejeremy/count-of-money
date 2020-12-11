import config from '../../config.json';

export async function startArticlesCronJob() {
  try {
    const articles = await fetch(`${config.api_url}/articles/createFromRSS`, {
      method: 'POST',
    });
    return await articles.json();
  } catch (e) {
    return { err: e };
  }
}

export async function getArticlesByKeywords(keywordsId, token) {
  try {
    const keywordsQuery = keywordsId.join(',');
    const articles = await fetch(
      `${config.api_url}/articles?keywords=${keywordsQuery}`,
      {
        method: 'GET',
        headers: {
          token: token,
        },
      },
    );
    return await articles.json();
  } catch (e) {
    return { err: e };
  }
}
