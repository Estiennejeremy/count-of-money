<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Mes cryptos Money</h4>
          </md-card-header>
          <md-card-content>
            <cryptos-table table-header-color="green"></cryptos-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import CryptosTable from '../components/Cryptos/CryptosTable.vue';


export default{
  components: {
    CryptosTable
  }
}

</script>

<style lang="scss" scoped></style>
