<template>
  <v-app id="inspire" class="app dashboard">
    <v-navigation-drawer class="app--drawer" temporary app v-model="showDrawer">
      <v-toolbar color="primary darken-1" dark dense>
        <v-toolbar-title class="ml-0 pl-3">
          <span class="hidden-sm-and-down">Mani</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="(item, index) in drawerItems"
          :key="index"
          link
          @click="goto(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card>
      <v-toolbar dense tile color="primary">
        <v-app-bar-nav-icon @click="showDrawer = !showDrawer" color="white"></v-app-bar-nav-icon>
        <v-spacer />
        <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
          <template v-slot:activator="{on: click}">
            <v-btn icon large text color="white" v-on="{...click}">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item
              v-for="(item, index) in menuItems"
              @click="item.click"
              ripple="ripple"
              :key="index"
            >
              <v-list-item-icon v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import router from "../router";
export default Vue.extend({
  data: () => ({
    showDrawer: false,
    menuItems: [
      {
        icon: "person",
        title: "accountMenuLabel",
        click: () => {
          return;
        }
      },
      {
        icon: "power_off",
        title: "logoutMenuLabel",
        click: () => {
          return;
        }
      }
    ],
    drawerItems: [
      {
        icon: "home",
        title: "dashboardDrawerLabel",
        route: "Home"
      },
      {
        icon: "account_balance",
        title: "accountsDrawerLabel",
        route: "Accounts"
      },
      {
        icon: "category",
        title: "categoriesDrawerLabel",
        route: "Categories"
      },
      {
        icon: "attach_money",
        title: "transactionsDrawerLabel",
        route: "Transactions"
      },
      {
        icon: "autorenew",
        title: "ordersDrawerLabel",
        route: "Orders"
      },
      {
        icon: "bar_chart",
        title: "statisticsDrawerLabel",
        route: "Statistics"
      }
    ]
  }),

  methods: {
    goto(name: string) {
      this.$router.push({ name });
    }
  }
});
</script>
<style scoped>
</style>