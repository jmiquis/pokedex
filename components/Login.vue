

<template>
    <div class="modal-container">
      <div class="login-form">
        <div class="login-form-header">
            <h2>Login</h2>
        <button @click="closeForm" >
            <img src="../assets/close-button.svg" alt="Close modal" />
        </button>
        </div>
        <form class="form-content" @submit.prevent="login">
                <div class="error" v-show="loginError">
                    <h3>{{LoginErrorMsg}}</h3>
                </div>
                <div class="column">
                    <div class="login-item">
                        <label for="login-email">Email</label>
                        <input type="email" id="email" v-model="email" />
                    </div>
                    <div class="login-item">
                        <label for="login-password">Password</label>
                        <input type="password" id="password" v-model="password" />
                    </div>
                    <div class="login-item">
                      <button @click="$emit('close-log-form')" class="guestMode">Cancel</button>
                      <button type="submit" class="authentication">Login</button>
                    </div>
                </div>
        </form>
    </div>
  </div>



</template>

<script setup>
import { ref,defineEmits } from 'vue';
import axios from 'axios';
import {useUserStore} from '../store/user.js'

    const emit = defineEmits(['close-log-form','login'])

    const email = ref("");
    const password = ref("");
    const token = ref("")
    const user = useUserStore();



    const loginError   = ref(false)
    const LoginErrorMsg = ref("");

    const login =async ()=>{
      let request = await axios.post("http://localhost:3000/login",{
                                                                    email:email.value,
                                                                    password:password.value
                                                                  });
      if (request.data.error){
        loginError.value=true;
        LoginErrorMsg.value=request.data.mensaje;
        return;
      }
      loginError.value=false;
      token.value = request.data.data.tokenId
      user.setUserData(request.data.data)
      emit("login")
    }

    const closeForm =()=>emit('close-log-form')
</script>

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
  .login-item {
    margin-bottom: 20px;
  }
  .login-item label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .login-item input,
  .login-item select,
  .login-item textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-width: 300px;
  }
  .login-item button {
    background: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .login-error {
    color: red;
    margin-bottom: 20px;
  }
</style>