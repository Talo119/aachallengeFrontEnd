<template>
    <v-container>
        <v-row align-content="center" justify="center">
            <v-col align="center" justify="center">
                <v-card  max-width="400px">                    
                    <v-toolbar class="ma-sm-0 pa-sm-0" dark color="primary">
                        <v-toolbar-title>
                            Login
                        </v-toolbar-title>                        
                    </v-toolbar>                    
                    
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="email" autofocus  label="Email" color="primary" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="password" type="password" color="primary" label="Password" required>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" v-show="error">
                                    <div class="red--text" v-if="error">
                                        {{error}}
                                    </div>
                                </v-col>

                            </v-row>
                        </v-container>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <div class="text-start px-sm-3 pb-sm-3">
                                <v-btn @click="signIn()" color="primary">Sign In</v-btn>
                            </div>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:'',
            error:null
        }
    },

    methods:{
        signIn(){
            this.error = null;
            axios.post('api/Users/Login',{email: this.email, password: this.password})
            .then(respuesta =>{
                return respuesta.data
            })
            .then(data =>{
                console.log(data.token)
                this.$store.dispatch("saveToken", data.token)
                this.$router.push({name:'Home'})
            })
            .catch(err =>{                
                if (err.response.status==400){
                    this.error = 'This is not a valid email.'
                } else if (err.response.status==404){
                    this.error = 'The user does not exist or their data is incorrect.'
                } else{
                    this.error = 'An error occurred.'
                }
                console.log(err)
            })
        }
    }
}
</script>