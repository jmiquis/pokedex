<script setup >
import {useUserStore} from '../store/user.js'

  //properties
  const props=defineProps({pokemon:Object});
  //events emitted
  const emit = defineEmits(['delete-pokemon']);

  //functions
  const deletePokemon = (id) => {emit('delete-pokemon', id)};

  //attributes
const user = useUserStore();
</script>

<template>
  <div class="pokemon" :class="pokemon.captured && 'pokemon_captured'">
    <button class="delete_pokemon"  v-if="user.authenticated"
                                    @click="deletePokemon(pokemon.id)">
      <img src="../assets/delete-button.svg" alt="Delete Pokemon" />
    </button>

    <div class="pokemon_image">
      <img :src="pokemon.sprite">
    </div>
    <h2 class="pokemon_name">
      {{ pokemon.name }}
    </h2>
    <div class="pokemon_info">
      <div class="pokemon_types">
        <div v-for="attribute in pokemon.types" :key="attribute" class="pokemon_type">
          <span :class="'pokemon_type_'+attribute.toLowerCase()">{{attribute}}</span>
        </div>
      </div>
          <div class="pokemon_description">
              {{pokemon.description}}
          </div>
      <div class="pokemon_abilities">
          <div v-for="attribute in pokemon.abilities" :key="attribute" class="pokemon_ability">
              <span :class="'pokemon_ability_'+attribute.toLowerCase()">{{attribute}}</span>
          </div>
      </div>
      <div class="pokemon_stats">
          <div class="pokemon_stat">
              <span class="pokemon_stat_name">Height</span>
              <span class="pokemon_stat_value">
                  {{pokemon.height}}
              </span>
          </div>
          <div class="pokemon_stat">
              <span class="pokemon_stat_name">Weight</span>
              <span class="pokemon_stat_value">
                  {{pokemon.weight}}
              </span>
          </div>
      </div>
    </div>
  </div>
</template>

<style>
/*Animations*/
@keyframes backgroundChangeColor{
    0% {background-color: gold;}
    50% {background-color: orange;}
   100% {background-color: white}
}

    .pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  max-width: 400px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: gold;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  /*to keep all cards*/
  height: 30rem;
  /*border*/
  border: 1px solid black;

}
.pokemon_captured {
  background-color: red;
   /*animation*/
  animation-name: backgroundChangeColor;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
.pokemon_image {
  width: 100%;
  max-width: 200px;
  height: 100%;
  max-height: 200px;
  margin-bottom: 1rem;
}
.pokemon_image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pokemon_info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pokemon_name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.pokemon_description {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}
.pokemon_types {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.pokemon_type {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}
.pokemon_type_fire {
  background-color: #f08030;
  color: #fff;
}
.pokemon_type_water {
  background-color: #6890f0;
  color: #fff;
}
.pokemon_type_grass {
  background-color: #78c850;
  color: #fff;
}
.pokemon_type_electric {
  background-color: #f8d030;
  color: #fff;
}
.pokemon_type_ice {
  background-color: #98d8d8;
  color: #fff;
}
.pokemon_type_fighting {
  background-color: #c03028;
  color: #fff;
}
.pokemon_type_poison {
  background-color: #a040a0;
  color: #fff;
}
.pokemon_type_ground {
  background-color: #e0c068;
  color: #fff;
}
.pokemon_type_flying {
  background-color: #a890f0;
  color: #fff;
}
.pokemon_type_psychic {
  background-color: #f85888;
  color: #fff;
}
.pokemon_type_bug {
  background-color: #a8b820;
  color: #fff;
}
.pokemon_type_rock {
  background-color: #b8a038;
  color: #fff;
}
.pokemon_type_ghost {
  background-color: #705898;
  color: #fff;
}
.pokemon_type_dragon {
  background-color: #7038f8;
  color: #fff;
}
.pokemon_type_dark {
  background-color: #705848;
  color: #fff;
}
.pokemon_type_steel {
  background-color: #b8b8d0;
  color: #fff;
}
.pokemon_type_fairy {
  background-color: #ee99ac;
  color: #fff;
}
.pokemon_abilities {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.pokemon_ability {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  background-color: #f8f8f8;
  color: #000;
}
.pokemon_stats {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pokemon_stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pokemon_stat_name {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}
.pokemon_stat_value {
  font-size: 1rem;
  font-weight: 700;
}
.delete_pokemon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete_pokemon img {
  width: 20px;
}



</style>