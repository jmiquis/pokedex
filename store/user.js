import { defineStore } from 'pinia'
import { ref} from 'vue'

export const useUserStore = defineStore('user',()=> {

    var authenticated = ref(false);
    var name          = ref("");
    var tokenId       = ref("");



        const setUserData=(data)=>{
            authenticated.value = true;
            name.value          = data.name;
            tokenId.value       = data.tokenId;
        }

    return {
        setUserData,authenticated,name,tokenId
    }
})