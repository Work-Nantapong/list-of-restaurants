<script lang="ts">
import RestaurantDataService from "@/services/RestaurantDataService"
import ResponseData from "@/types/ResponseData"
import ListItem from "@/components/Lists/ListItem.vue";

export default {
  name: "restaurant-list",
  components: {ListItem},
  data() {
    return {
      restaurantLists: [] as restaurantLists[],
      keyword: "Bang Sue",
    };
  },
  methods: {
    nearbySearch(keyword) {
      RestaurantDataService.findPlease(keyword)
          .then((response: ResponseData) => {
            this.restaurantLists = response.data.results;
          })
          .catch((e: Error) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.nearbySearch(this.keyword);
  },
}

</script>

<template>
  <card class="search">
    <v-toolbar flat class="search">
      <v-card-text>
        <v-text-field
            v-model="keyword"
            density="compact"
            variant="solo"
            label="Search templates"
            single-line
            hide-details
        ></v-text-field>
      </v-card-text>
      <v-btn
          class="button"
          type="submit"
          @click="nearbySearch(keyword)"
      >
        Search
      </v-btn>
    </v-toolbar>
  </card>
  <v-container class="card-coroll">
    <v-row dense>
      <ListItem v-for="(list, index) in restaurantLists" :location='list.place_id' :rating='list.rating'>
        <template #img>
          <img alt="Vue logo" class="logo" src="../../assets/Restaurant.jpg" width="125" height="125" />
        </template>
        <template #title>ร้าน : {{ list.name }}</template>
        <template #rating>คะแนน : {{ list.rating }}</template>
        <template #subtitle>ที่อยู่ :
          {{ list.formatted_address }}
        </template>
        <template #btn-title>Map</template>
      </ListItem>
      <v-col cols="12">
        <v-card color="#1F7087" theme="dark">
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card-coroll {
  overflow-y: scroll;
  height: 700px;
}

.button {
  background-color: #7e4d2e;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 10px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 5px 8px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

</style>