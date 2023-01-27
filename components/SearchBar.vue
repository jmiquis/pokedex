<template>
    <div class="search" v-if="user.authenticated">
      <input type="text" v-model="search" placeholder="Search for a pokemon" />
      <button class="clear" v-if="search.length" @click="clearSearch">
        Clear search
      </button>
      <button v-if="user.authenticated"
              @click="showForm">Add a pokemon</button>
    </div>
  </template>

<script setup>
import { ref, defineEmits, watch } from "vue";
import {useUserStore} from '../store/user'

//events
const emit   = defineEmits(["show-form", "search"]);

//attributes
const search = ref("");
const user = useUserStore();

//functions
const showForm = () => {
  emit("show-form");
};
const clearSearch = () => {
  search.value = "";
};
watch(search, (value) => {
  emit("search", value);
});
</script>

<style>
.search {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 25px;
  justify-content: space-between;
}
.search input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 3rem;
  margin: 0 auto;
  max-width: 500px;
  width: 500px;
}
.search button {
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 3rem;
  cursor: pointer;
  background: #4caf50;
  color: #fff;
}

</style>