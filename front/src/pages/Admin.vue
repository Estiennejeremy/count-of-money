<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <add-crypto-card></add-crypto-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <cryptos>
          <template v-slot:title>
            <h4 class="title">Default cryptocurrencies</h4>
          </template>
          <template v-slot:subtitle>
            <p class="subtitle">
              It will be the default cryptos for non connected users
            </p>
          </template>
        </cryptos>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <delete-crypto-card></delete-crypto-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <add-rss-card></add-rss-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <keywords>
          <template v-slot:title>
            <h4 class="title">Default keywords</h4>
          </template>
          <template v-slot:subtitle>
            <p class="subtitle">
              It will be the default keywords for non connected users
            </p>
          </template>
        </keywords>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <delete-rss-card></delete-rss-card>
      </div>
    </div>
  </div>
</template>

<script>
import AddCryptoCard from '../components/Admin/AddCryptoCard';
import DeleteCryptoCard from '../components/Admin/DeleteCryptoCard';
import AddRssCard from '../components/Admin/AddRssCard';
import DeleteRssCard from '../components/Admin/DeleteRssCard';
import Cryptos from '../components/UserProfile/Cryptos';
import Keywords from '../components/UserProfile/Keywords';

export default {
  components: {
    AddCryptoCard,
    DeleteCryptoCard,
    AddRssCard,
    DeleteRssCard,
    Cryptos,
    Keywords,
  },
};
</script>

<style lang="scss" scoped></style>
