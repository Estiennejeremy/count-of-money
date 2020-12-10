<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">My crypto currencies</h4>
          </md-card-header>
          <md-card-content>
            <cryptos-table table-header-color="green"></cryptos-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <cryptos-chart></cryptos-chart>
      </div>
    </div>
  </div>
</template>

<script>
import CryptosTable from '../components/Cryptos/CryptosTable.vue';
import CryptosChart from '../components/Cryptos/CryptosChart.vue';

export default {
  components: {
    CryptosTable,
    CryptosChart,
  },
};
</script>

<style lang="scss" scoped></style>
