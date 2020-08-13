<template>
  <v-container v-if="account" class="mani-info-panel-container">
    <v-dialog v-model="dialog" max-width="500" max-height="700">
      <avatar-picker
        :color="account.color"
        :logo="account.logo"
        @onAvatarSelected="onAvatarSelected"
        @onCancel="onCancel"
      />
    </v-dialog>
    <v-avatar tile :color="account.color" class="mani-info-panel-avatar" @click="dialog=true">
      <v-icon color="white">{{account.logo}}</v-icon>
    </v-avatar>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <validation-text-field
        name="name"
        rules="required"
        v-model="account.name"
        label="accountNameLabel"
      />
      <validation-text-field
        name="description"
        rules="required"
        v-model="account.description"
        label="accountDescriptionLabel"
      />
      <v-text-field v-model="account.balance" disabled :label="$t('accountBalanceLabel')" outlined></v-text-field>
      <v-btn
        bottom
        depressed
        large
        color="primary"
        class="mani-info-panel-button"
        @click="handleSubmit(onSaveClick)"
      >{{ $t('save') }}</v-btn>
      <v-btn
        v-if="showDeleteButton"
        bottom
        depressed
        large
        color="error"
        class="mt-5 mani-info-panel-button"
        @click="$emit('onDeleteClick')"
      >{{ $t('delete') }}</v-btn>
    </validation-observer>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import AvatarPicker from "@/components/input/Avatar.picker.vue";
import store from "../../store";
export default Vue.extend({
  components: {
    AvatarPicker,
  },
  props: {
    account: { type: Object },
    showDeleteButton: { type: Boolean, default: false },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    onCancel() {
      this.dialog = false;
    },
    onAvatarSelected(avatar: any) {
      this.dialog = false;
      // todo: http request
      this.account.logo = avatar.logo;
      this.account.color = avatar.color;
      // store.commit("accounts/add", this.account);
    },
    onSaveClick() {
      this.$emit("onSaveClick", this.account);
    },
  },
});
</script>
<style scoped>
</style>