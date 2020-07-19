<template>
  <v-container v-if="account">
    <v-dialog v-model="dialog" max-width="500" max-height="700">
      <avatar-picker
        :color="account.color"
        :logo="account.logo"
        @onAvatarSelected="onAvatarSelected"
        @onCancel="onCancel"
      />
    </v-dialog>
    <v-avatar tile :color="account.color" @click="dialog=true">
      <v-icon color="white">{{account.logo}}</v-icon>
    </v-avatar>
    <v-text-field v-model="account.name" :label="$t('accountNameLabel')" outlined></v-text-field>
    <v-text-field v-model="account.balance" :label="$t('accountBalanceLabel')" outlined></v-text-field>
    <v-text-field v-model="account.description" :label="$t('accountDescriptionLabel')" outlined></v-text-field>
    <v-btn bottom depressed large color="primary">{{ $t('save') }}</v-btn>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import AvatarPicker from "@/components/input/Avatar.picker.vue";
import store from "../../store";
export default Vue.extend({
  components: {
    AvatarPicker
  },
  props: {
    account: { type: Object }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    onCancel() {
      this.dialog = false;
    },
    onAvatarSelected(avatar: any) {
      this.dialog = false;
      // todo: http request
      // this.account.logo = avatar.logo;
      // this.account.color = avatar.color;
      // store.commit("accounts/add", this.account);
    }
  }
});
</script>
<style scoped>
.v-btn {
  width: 100%;
}
.container {
  height: 100%;
}
.v-avatar {
  margin-bottom: 20px;
}
.v-avatar:hover {
  cursor: pointer;
}
</style>