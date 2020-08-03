<template>
  <v-layout row wrap>
    <transaction-create-dialog v-model="dialog" />
    <v-flex v-for="(category, index) in mains" :key="index" xs12 sm6 lg4 xl3>
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
import TransactionCreateDialog from "@/components/dialogs/Transaction.create.dialog.vue";
export default Vue.extend({
  components: {
    EntityCard,
    BlankEntityCard,
    TransactionCreateDialog,
  },
  data: () => ({ dialog: false }),
  computed: {
    ...mapGetters({
      loading: CATEGORIES.PENDING,
      mains: CATEGORIES.MAINS,
    }),
  },
  methods: {
    ...mapActions({
      loadCategories: CATEGORIES.LOAD_ALL,
    }),
    onCategoryClick(category: any) {
      this.$router.push({ name: "Category", params: { id: category.id } });
    },
    onAddCategoryClick() {
      this.dialog = true;
      // this.$router.push({ name: "CreateCategory" });
    },
    subCategoriesNames(category: Category): string {
      return category.subcategories.map((x) => x.name).join(", ");
    },
  },
  mounted() {
    this.loadCategories();
  },
});
</script>
<style scoped>
.card {
  max-height: 140px;
}
</style>