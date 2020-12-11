import config from '../../config.json';
import Cookies from 'js-cookie';

export async function createCrypto(data, token) {
  try {
    const currency = await fetch(`${config.api_url}/cryptos/`, {
      method: 'POST',
      body: JSON.stringify({
        symbol: data.symbol,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        token: token,
      },
    });
    return await currency.json();
  } catch (e) {
    return { err: e };
  }
}

export async function getAllCryptos() {
  try {
    const cryptos = await fetch(`${config.api_url}/cryptos`, {
      method: 'GET',
      header: { token: Cookies.get('token') },
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
      header: { token: Cookies.get('token') },
    });
    return await res.json();
  } catch (e) {
    return { err: e };
  }
}

export async function getCryptosByIdsCurrency(ids, token) {
  try {
    const arr = ids.join(',');
    const cr = await fetch(`${config.api_url}/cryptos?cryptoId=${arr}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    return await cr.json();
  } catch (error) {
    return { err: error };
  }
}

export async function getCryptoHistoryByPeriod(id, period, currency) {
  try {
    const cryptos = await fetch(
      `${config.api_url}/cryptos/${id}/history/${period}/${currency}`,
      {
        method: 'GET',
      },
    );
    return await cryptos.json();
  } catch (e) {
    return { error: e };
  }
}
