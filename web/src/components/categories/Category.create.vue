<template>
  <v-layout row wrap>
    <v-flex xs3></v-flex>
    <v-flex xs6>
      <category-info :category="category" @onSaveClick="onSaveClick" />
    </v-flex>
    <v-flex xs3></v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
import CategoryInfo from "@/components/categories/Category.info.vue";
import { mapActions } from "vuex";
import { CATEGORIES } from "../../store/types/categories.types";
export default Vue.extend({
  components: {
    CategoryInfo,
  },
  data: () => ({
    category: {
      id: null,
      name: "",
      logo: "add",
      color: "#000000",
      categoryId: null, // todo: subcategory handling
    },
  }),
  methods: {
    ...mapActions({ create: CATEGORIES.CREATE }),
    onSaveClick() {
      this.create(this.category);
    },
  },
});
</script>
<style scoped>
</style>