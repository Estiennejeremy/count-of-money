<template>
  <div>
    <md-table v-model="cryptos" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="" class="text-center"
          ><img :src="item.ico_url" alt="" class="image-size"
        /></md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Code">{{ item.code }}</md-table-cell>
        <md-table-cell md-label="Price"
          >{{ item.current_price }} {{ user.currency }}</md-table-cell
        >
        <md-table-cell md-label="Lowest Price"
          >{{ item.lowest_price }} {{ user.currency }}</md-table-cell
        >
        <md-table-cell md-label="Highest Price"
          >{{ item.highest_price }} {{ user.currency }}</md-table-cell
        >
        <md-table-cell md-label="Openning Price"
          >{{ item.opening_price }} {{ user.currency }}</md-table-cell
        >
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { getUserById, editUser, getAdminUser } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';
import { getCryptosByIdsCurrency } from '../../api_wrapper/crypto';
import config from '../../../config.json';

export default {
  name: 'cryptos-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: '',
    },
  },
  async mounted() {
    const token = Cookies.get('token');
    let user = {};
    if (token) {
      const userId = await getUserIdByToken(token);
      user = await getUserById(userId);
    } else {
      user = (await getAdminUser())[0];
    }
    this.user = {
      id: user.id,
      username: user.username,
      cryptos: user.crypto_array,
      email: user.email,
      currency: user.default_currency,
    };

    this.cryptos = await getCryptosByIdsCurrency(
      this.user.cryptos,
      token || '',
    );
    this.cryptos.forEach(e => {
      e.ico_url = `https://www.cryptocompare.com${e.ico_url}`;
    });
  },
  data() {
    return {
      selected: [],
      user: null,
      cryptos: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.image-size {
  width: 30px;
}
</style>
