<template>
  <v-layout row wrap>
    <v-flex v-for="(category, index) in categories" :key="index" xs12 sm6 lg4 xl3>
      <entity-card
        class="card"
        :circle="true"
        :avatar="category.logo"
        :color="category.color"
        :title="category.name"
        :text="subCategoriesNames(category)"
        @click="onCategoryClick(category)"
      />
    </v-flex>
    <v-flex xs12 sm6 lg4 xl3>
      <blank-entity-card :circle="true" @click="onAddCategoryClick" />
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
import EntityCard from "@/components/cards/EntityCard.vue";
import BlankEntityCard from "@/components/cards/BlankEntityCard.vue";
import { mapGetters, mapActions } from "vuex";
import { CATEGORIES } from "@/store/types/categories.types";
import { Category } from "../../api/entity/category/category.entity";
export default Vue.extend({
  components: {
    EntityCard,
    BlankEntityCard
  },
  computed: {
    ...mapGetters({
      loading: CATEGORIES.PENDING,
      categories: CATEGORIES.CATEGORIES
    })
  },
  methods: {
    ...mapActions({
      loadCategories: CATEGORIES.GET_ALL
    }),
    onCategoryClick(category: any) {
      this.$router.push({ name: "Category", params: { id: category.id } });
    },
    onAddCategoryClick() {
      return;
    },
    subCategoriesNames(category: Category): string {
      return category.subcategories.map(x => x.name).join(", ");
    }
  },
  mounted() {
    this.loadCategories();
  }
});
</script>
<style scoped>
.card {
  height: 140px;
}
</style>