<template>
  <div id="app">
    <div class="header">
      <img class="logo" alt="UOC logo" src="./assets/pokedexDetail.png" />
      <div class="app-name">Pokedex</div>
          <button class="login-button" v-if="!user.authenticated"
                                        @click="showLogin=true">
            <img src="./assets/Poké_Ball_icon.svg.png" alt="pokeball">
            login
          </button>
          <button class="logout-button" v-if="user.authenticated"
                                        @click="logOut()">
            <img src="./assets/Poké_Ball_icon.svg.png" alt="pokeball">
            logOut
          </button>
      <div class="user" v-if="user.authenticated">
        <img src="./assets/pikachuLogo.png" alt="pikachu logo">
        <h3>{{user.name}}</h3>
      </div>
    </div>
    <SearchBar v-on:showForm="toggleForm"
                 v-on:search="setSearchTerm"/>
    <PokemonList  v-on:delete-pokemon="deletePokemon"
                  :pokemonList="pokemonView"
    />
    <Form
              v-show="showModal"
              v-on:add-pokemon="addPokemon"
              v-on:close-form="toggleForm"
    />
    <Login  v-show="showLogin"
            v-on:login="loggedUser"
            v-on:close-log-form="showLogin=false"
            />

  </div>
</template>


<script setup >

import { defineComponent,onMounted,ref,watch } from 'vue'
import PokemonList from './components/PokemonList.vue'
import SearchBar from './components/SearchBar.vue'
import Form from './components/Form.vue'
import Login from './components/Login.vue'
import axios from 'axios'
import {useUserStore} from './store/user'



//components
    const components = defineComponent({
      PokemonList,
      SearchBar,
      Form,
      Login
    });

    //attributes

    var pokemonList = ref([]);
    var showModal   = ref(false);
    var searchTerm  = ref("");
    var pokemonView = ref([]);
    var showLogin   = ref(false)
    const user      = useUserStore();

    //functions


     const fetchData  = async ()=>{

      try{
        let response =(!user.authenticated) ?
                                           await axios.get("http://localhost:3000/pokedex"):
                                           await axios.get("http://localhost:3000/pokedex",{headers:
                                                                                                    {authorization:user.tokenId}
                                                                                           });

      pokemonList.value   = response.data.data;
      pokemonView.value   = pokemonList.value;
      }catch{
        console.log('There has been an error fetching the data')
      }

    }

    const addPokemon=async (pokemon)=>{

      try{
        await axios.post(
          "http://localhost:3000/pokemon/",pokemon,{headers:{
                                                              authorization:user.tokenId
                                                            }
                                                   }
      );
        fetchData();
        showModal.value=false;
      }catch{
        console.log('There has been an error while the adding pokemon proccess')
      }

    }

    const deletePokemon=async (id)=>{
      var headers={
        "authorization":user.tokenId
      }

      try{
        await axios.delete("http://localhost:3000/pokemon/",{headers,
                                                                     data:{id:id}
                                                            });
        fetchData();
      }catch{
        console.log('There has been an error while the deleting pokemon proccess')
      }

    }

    const loggedUser =()=>{
      fetchData();
      showLogin.value=false;
    }

    const toggleForm    = ()=>showModal.value=!showModal.value;
    const setSearchTerm = (searchTermComponent)=>searchTerm.value=searchTermComponent;

    const logOut = ()=>{
      user.authenticated = false;
      user.tokenId       = '';
      fetchData();
    }
    //watchers
    watch(searchTerm,()=>{
      if(searchTerm.value===""){
        pokemonView.value=pokemonList.value;
      }else{
        pokemonView.value=[];
        pokemonList.value.forEach((pokemon)=>{
          if( pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
            ||pokemon.description.toLowerCase().includes(searchTerm.value.toLowerCase())
            ||pokemon.types.some((type)=>type.toLowerCase().includes(searchTerm.value.toLowerCase())
            ||pokemon.abilities.some((ability)=>ability.toLowerCase().includes(searchTerm.value.toLowerCase())))
          ){
            pokemonView.value.push(pokemon)
          }
        });
      }

    });

    onMounted(() => {
      fetchData();
    })

</script>

<style>

/*Fonts*/
@font-face {
  font-family: pokemon;
  src: url('./fonts/Pokemon\ Hollow.ttf');
}

body {
  margin: 0;
  background-color: rgb(243, 67, 67);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
.header {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.header .left {
  display: flex;
  align-items: center;
}
.header .right {
  display: flex;
  align-items: center;
}
.header .logo {
  max-height: 50px;
}
.header .app-name {
  margin-left: 25px;
  font-weight: bold;
  font-size: 4rem;
  font-family: pokemon;
  color: yellow;
}
.header .user {
  display: flex;
}
.user img{
  width: 3rem;
  height: 3rem;
}
.header .login-button,
.header .logout-button {
  background: #2c3e50;
  color: #fff;
  border: 0;
  padding: 1rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
}
.header .login-button img,
.header .logout-button img{
  width:5rem;
  height:5rem;
}
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.login-form-header button img {
  width: 20px;
}
.login-form-item {
  margin-bottom: 20px;
}
.login-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.login-form-item input,
.login-form-item select,
.login-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.login-form-item button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-bottom: 20px;
}
</style>
