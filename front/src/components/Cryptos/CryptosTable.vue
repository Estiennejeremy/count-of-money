<template>
  <div>
    <md-table v-model="cryptos" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label=""><img :src='item.ico_url' alt=""></md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Code">{{ item.code }}</md-table-cell>
        <md-table-cell md-label="Price">{{ item.current_price }} {{user.currency}}</md-table-cell>
        <md-table-cell md-label="Lowest Price">{{ item.lowest_price }} {{user.currency}}</md-table-cell>
        <md-table-cell md-label="Highest Price">{{ item.highest_price }} {{user.currency}}</md-table-cell>
        <md-table-cell md-label="Openning Price">{{ item.opening_price }} {{user.currency}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { getUserById, editUser } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';
import getCryptosByIdsCurrency from '../../api_wrapper/crypto';
import config from '../../../config.json';

export default {
  name: "cryptos-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  async beforeMount() {
    const token = Cookies.get('token');
    const userId = await getUserIdByToken(token);
    const user = await getUserById(userId);

    this.user = {
      id: user.id,
      username: user.username,
      cryptos: user.crypto_array,
      email: user.email,
      currency: user.default_currency
    };
    let res = await fetch(`http://localhost:8081/api/cryptos`, {
      method: 'GET'
    });
    
    this.cryptos = await getCryptosByIdsCurrency(this.user.cryptos, this.user.currency);
    this.cryptos.forEach(e => {
      e.ico_url = `localhost:8080${e.ico_url}`;
    });

  },
  data() {
    return {
      selected: [],
      user: null,
      cryptos: [],
      users: [
        {
          name: "Bitcoins",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout"
        },
        {
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas"
        },
        {
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park"
        },
        {
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester"
        },
        {
          name: "Doris Greene",
          salary: "$63,542",
          country: "Malawi",
          city: "Feldkirchen in Kārnten"
        },
        {
          name: "Mason Porter",
          salary: "$78,615",
          country: "Chile",
          city: "Gloucester"
        }
      ]
    };
  }
};
</script>
