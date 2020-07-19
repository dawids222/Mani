<template>
  <v-card>
    <v-tabs v-model="tab" fixed-tabs background-color="indigo" dark>
      <v-tab href="#tab-logo">{{$t('avatarPickerLogoLabel')}}</v-tab>
      <v-tab href="#tab-color">{{$t('avatarPickerColorLabel')}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-logo">
        <v-card flat>
          <v-text-field v-model="search" :label="$t('search')" outlined></v-text-field>
          <v-icon
            v-for="(icon, index) in filteredIcons"
            :key="index"
            :class="{
                'v-icon-selected': icon.selected
            }"
            @click="onLogoSelected(icon)"
          >{{icon.name}}</v-icon>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-color">
        <v-card flat>
          <v-layout justify-center>
            <v-color-picker :value="color" @input="onColorSelected" />
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-card-actions>
      <v-layout>
        <v-flex>
          <v-btn color="error" @click="$emit('onCancel', $event)">{{$t('cancel')}}</v-btn>
        </v-flex>
        <v-flex>
          <v-btn color="success" @click="onSave">{{$t('save')}}</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    color: { type: String },
    logo: { type: String }
  },
  data: () => ({
    tab: null,
    search: "",
    selectedColor: "",
    selectedLogo: "",
    icons: [
      { name: "person", selected: false },
      { name: "add", selected: false },
      { name: "attach_money", selected: false },
      { name: "alarm", selected: false },
      { name: "build", selected: false },
      { name: "done", selected: false },
      { name: "favorite", selected: false },
      { name: "delete", selected: false },
      { name: "grade", selected: false }
    ]
  }),
  computed: {
    filteredIcons(): any[] {
      return this.icons.filter(x => x.name.includes(this.search));
    }
  },
  methods: {
    onColorSelected(color: string) {
      this.selectedColor = color;
    },
    onLogoSelected(logo: any) {
      this.icons.forEach(x => (x.selected = false));
      logo.selected = true;
      this.selectedLogo = logo.name;
    },
    onSave() {
      const avatar = {
        logo: this.selectedLogo || this.logo,
        color: this.selectedColor || this.color
      };
      this.$emit("onAvatarSelected", avatar);
    }
  },
  mounted() {
    const selectedIcon = this.icons.find(x => x.name === this.logo)!;
    selectedIcon.selected = true;
  }
});
</script>
<style scoped>
.v-icon {
  width: 60px;
  height: 60px;
}
.v-icon:hover,
.v-icon-selected {
  cursor: pointer;
  transform: scale(1.5);
  color: var(--v-success-base);
}
.v-input {
  margin: 10px 5px 0px 5px;
}
.v-card {
  overflow: hidden;
}
.v-btn {
  width: 99%;
}
</style>