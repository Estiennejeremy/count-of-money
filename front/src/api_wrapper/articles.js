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
    let keywordsQuery = '';
    keywordsId.forEach(
      element => (keywordsQuery = `${keywordsQuery}${element},`),
    );
    const articles = await fetch(
      `${config.api_url}/articles/getByKeywordsId?keywords=${keywordsQuery}`,
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
