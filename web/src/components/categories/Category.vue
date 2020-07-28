<template>
  <v-main>
    <simple-yes-no-dialog
      v-model="dialog"
      :title="$t('deleteDialogTitle')"
      :message="$t('deleteCategoryDialogMessage')"
      @onYesClick="deleteCategory"
    />
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <panel class="panel">
              <category-info
                :category="get(categoryId)"
                :showDeleteButton="true"
                @onDeleteClick="onDeleteClick"
              />
            </panel>
          </v-flex>
          <v-flex d-flex xs12>
            <panel class="panel">
              <!-- <account-operations /> -->
            </panel>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md9 fill-height>
        <panel class="panel">
          <transactions :categoryId="categoryId" />
        </panel>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import Panel from "@/components/cards/Panel.vue";
import Transactions from "@/components/transactions/Transactions.vue";
import SimpleYesNoDialog from "../dialogs/SimpleYesNoDialog.vue";
import { mapGetters, mapActions } from "vuex";
import CategoryInfo from "./Category.info.vue";
import { CATEGORIES } from "../../store/types/categories.types";
export default Vue.extend({
  components: {
    Panel,
    Transactions,
    SimpleYesNoDialog,
    CategoryInfo,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({ get: CATEGORIES.GET }),
    categoryId(): number {
      return Number(this.$router.currentRoute.params["id"]);
    },
  },
  methods: {
    onDeleteClick() {
      this.dialog = true;
    },
    deleteCategory() {
      return;
    },
  },
});
</script>
<style scoped>
</style>