<template>
    <div id="pokemon-list" class="pokemon-list">
      <div v-for="pokemon in pokemonList" :key="pokemonList.id">
        <Pokemon :pokemon="pokemon" v-on:delete-pokemon="deletePokemon" />
      </div>
    </div>
</template>

<script setup>
    import Pokemon from './Pokemon.vue';
    import { defineComponent } from 'vue';

    //components
    const components = defineComponent({
      Pokemon
    });

    //Props
    const props = defineProps({
      pokemonList:[]
    });

    //events
    const emit = defineEmits(
      ['delete-pokemon']
    );
    //Functions
    const deletePokemon=(id)=>emit('delete-pokemon',id)
</script>

<style>
    .pokemon-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>