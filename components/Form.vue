<style>
  .modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.pokemon-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}
.pokemon-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.pokemon-form-header button img {
  width: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.form-group button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;
}
.error {
  color: red;
  margin-bottom: 20px;
}
</style>

<script setup>


import {ref,defineEmits } from 'vue';
//events
const emits = defineEmits(["close-form","add-pokemon"])


//attributes
  const pokemon = ref({
    id:"",
    name: "",
    description:"",
    species:"",
    types: "",
    abilities:"",
    height:"",
    weight:"",
    sprite:"",
    captured:false,
  });

  const error     = ref(false);

  //functions
  var resetPokemon = ()=>pokemon.value={
    id:"",
    name: "",
    description:"",
    species:"",
    types: "",
    abilities:"",
    height:"",
    weight:"",
    sprite:"",
    captured:false,
  }

  const closeForm = ()=>{
    emits("close-form");
    resetPokemon;
  }


  const addPokemon=()=>{
    if(  pokemon.value.id===""
       ||pokemon.value.name===""
       ||pokemon.value.species===""
       ||pokemon.value.types===""
    )
       {
        error.value=true;
        return;
       }try{
        error.value=false;
        pokemon.value.abilities = pokemon.value.abilities.split(",");
        pokemon.value.types     = pokemon.value.types.split(",");
        pokemon.value.species   = pokemon.value.species.split(",");
        emits('add-pokemon',pokemon.value)
        resetPokemon();
         //this method is used if the add pokemon doesn't work propperly, the [] values of the types, species and abilities makes conflict
       }catch{
        pokemon.value.abilities = pokemon.value.abilities.toString();
        pokemon.value.types     = pokemon.value.types.toString();
        pokemon.value.species   = pokemon.value.species.toString();
       }

  }
</script>

<template>
  <div class="modal-container">
    <div class="pokemon-form">
      <div class="pokemon-form-header">
        <h2>Add a new pokemon</h2>
        <button @click="closeForm" class="close-form">
          <img src="../assets/close-button.svg" alt="Close modal" />
        </button>
      </div>
      <div class="error" v-if="error">
        The fields id, name, species and types are required.
      </div>
      <form class="form-content" @submit.prevent="addPokemon">
        <div class="column">
          <div class="form-group">
            <label for="Id">Id</label>
            <input type="text" id="id" v-model="pokemon.id" />
          </div>
          <div class="form-group">
            <label for="Name">Name</label>
            <input type="text" id="name" v-model="pokemon.name" />
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input type="text" id="image" v-model="pokemon.sprite" />
          </div>
          <div class="form-group">
            <label for="date">Description</label>
            <textarea id="description" v-model="pokemon.description"></textarea>
          </div>
        </div>
        <div class="column">
          <div class="form-group">
            <label for="species">Species</label>
            <input type="text" id="species" v-model="pokemon.species" />
          </div>
          <div class="form-group">
            <label for="types">Types</label>
            <input type="text" id="types" v-model="pokemon.types" />
          </div>
          <div class="form-group">
            <label for="abilities">Abilities</label>
            <input type="text" id="abilities" v-model="pokemon.abilities" />
          </div>
          <div class="form-group">
            <label for="height">Height</label>
            <input type="text" id="height" v-model="pokemon.height" />
          </div>
          <div class="form-group">
            <label for="weight">Weight</label>
            <input type="text" id="weight" v-model="pokemon.weight" />
          </div>
          <div class="form-group">
            <label for="captured">Captured</label>
            <input type="checkbox" id="captured" v-model="pokemon.captured" />
          </div>
          <div class="form-group actions">
            <button @click="closeForm" class="cancel">Cancel</button>
            <button type="submit" class="add">Add</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
