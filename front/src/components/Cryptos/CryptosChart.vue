<template>
  <md-card class="card">
    <md-card-header data-background-color="blue">
      <h4>Crypto currencies evolution</h4>
    </md-card-header>
    <md-card-content>
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25"
        >
          <md-field>
            <label for="timePeriod">Time period</label>
            <md-select v-model="timePeriod" name="timePeriod" id="timePeriod">
              <md-option value="minute">Last 2 hours</md-option>
              <md-option value="hourly">Last 2 days</md-option>
              <md-option value="daily">Last 2 month</md-option>
            </md-select>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25"
        >
          <md-field>
            <label for="sortParam">Crypto currency</label>
            <md-select
              v-model="cryptoId"
              name="cryptoCurrency"
              id="cryptoCurrency"
            >
              <md-option
                v-for="crypto in cryptoArray"
                :key="crypto.id"
                :value="crypto.id"
                >{{ crypto.name }}</md-option
              >
            </md-select>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25"
        >
          <md-field>
            <label for="currency">Currency</label>
            <md-select v-model="currency" name="currency" id="currency">
              <md-option value="USD">USD</md-option>
              <md-option value="EUR">EUR</md-option>
              <md-option value="GPB">GBP</md-option>
              <md-option value="JPY">JPY</md-option>
              <md-option value="AUD">AUD</md-option>
              <md-option value="CAD">CAD</md-option>
              <md-option value="CHF">CHF</md-option>
              <md-option value="CNH">CNH</md-option>
              <md-option value="SEK">SEK</md-option>
              <md-option value="NZD">NZD</md-option>
            </md-select>
          </md-field>
        </div>
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <line-chart
            id="crypto-chart"
            :data="chartData"
            xkey="time"
            resize="true"
            ykeys='["high", "low"]'
            labels='["Highest value", "Lowest value"]'
            lineColors='[ "#36A2EB", "#FF6384" ]'
          >
          </line-chart>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import {
  getCryptoHistoryByPeriod,
  getAllCryptos,
} from '../../api_wrapper/crypto';
import { LineChart } from 'vue-morris';
import Raphael from 'raphael/raphael';
global.Raphael = Raphael;

export default {
  name: 'cryptos-chart',
  components: { LineChart },
  data() {
    return {
      timePeriod: 'hourly',
      cryptoArray: [],
      cryptoId: '',
      chartData: [],
      currency: 'EUR',
    };
  },

  methods: {
    formatChartData() {
      this.chartData.forEach(element => (element.time = element.time * 1000));
    },
    async getCurrencyData() {
      this.chartData = (
        await getCryptoHistoryByPeriod(
          this.cryptoId,
          this.timePeriod,
          this.currency,
        )
      ).Data.Data;
      this.formatChartData();
    },
  },

  watch: {
    cryptoId: async function() {
      await this.getCurrencyData();
    },
    timePeriod: async function() {
      await this.getCurrencyData();
    },
    currency: async function() {
      await this.getCurrencyData();
    },
  },
  async mounted() {
    this.cryptoArray = await getAllCryptos();
    this.cryptoId = this.cryptoArray[0].id;
    await this.getCurrencyData();
  },
};
</script>

<style scoped></style>
