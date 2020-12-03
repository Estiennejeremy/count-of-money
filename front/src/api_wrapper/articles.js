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

export async function getArticlesByKeywords(keywordsId) {
  try {
    let keywordsQuery = '';
    keywordsId.forEach(
      element => (keywordsQuery = `${keywordsQuery}${element},`),
    );
    const articles = await fetch(
      `${config.api_url}/articles?keywords=${keywordsQuery}`,
      {
        method: 'GET',
      },
    );
    return await articles.json();
  } catch (e) {
    return { err: e };
  }
}
