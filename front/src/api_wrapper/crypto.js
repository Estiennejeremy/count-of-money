import config from '../../config.json';

export async function createCrypto(data) {
  try {
    const currency = await fetch(`${config.api_url}/cryptos/postFromSymbol`, {
      method: 'POST',
      body: JSON.stringify({
        symbol: data.symbol,
        currency: data.currency,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return await currency.json();
  } catch (e) {
    return {err: e};
  }
}

export async function getAllCryptos() {
  try {
    const cryptos = await fetch(`${config.api_url}/cryptos`, {
      method: 'GET',
    });
    return await cryptos.json();
  } catch (e) {
    return { err: e };
  }
}

export async function deleteCryptoById(cryptoId) {
  try {
    const res = await fetch(`${config.api_url}/cryptos/${cryptoId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (e) {
    return { err: e };
  }
}

export default async function getCryptosByIdsCurrency(ids, currency) {
  try {
    let cryptos = await getAllCryptos();
    let arr = [];
    
    ids.forEach(e => {
      cryptos.forEach(el => {
        if (el.id === e)
          arr.push(el.code);
      });
    });

    arr = arr.join(',');

    const cr = await fetch(`${config.api_url}/cryptos/cryptoById?cryptoId=${arr}&currency=${currency}`, {
      method: 'GET',
    });

    return cr.json();
  } catch (error) {
    return {err: error};
  }
}
