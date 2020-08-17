<template>
  <v-container v-if="category" class="mani-info-panel-container">
    <v-dialog v-model="dialog" max-width="500" max-height="700">
      <avatar-picker
        :color="category.color"
        :logo="category.logo"
        @onAvatarSelected="onAvatarSelected"
        @onCancel="onCancel"
      />
    </v-dialog>
    <v-avatar :color="category.color" class="mani-info-panel-avatar" @click="dialog=true">
      <v-icon color="white">{{category.logo}}</v-icon>
    </v-avatar>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <validation-text-field
        name="name"
        rules="required|min:1|max:20"
        v-model="category.name"
        label="accountNameLabel"
      />
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
        class="mt-5 mani-info-panel-button"
        bottom
        depressed
        large
        color="error"
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
    category: { type: Object },
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
      this.category.logo = avatar.logo;
      this.category.color = avatar.color;
      // store.commit("accounts/add", this.account);
    },
    onSaveClick() {
      this.$emit("onSaveClick", this.category);
    },
  },
});
</script>
<style scoped>
</style>