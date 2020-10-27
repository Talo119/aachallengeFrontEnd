<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col align="center" justify="center">
                <v-card  max-width="400">                    
                    <v-toolbar class="ma-sm-0 pa-sm-0" dark color="primary">
                        Login
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

                                <v-col cols="12" v-show="valid">
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
                                <v-btn @click="signIn" color="primary">Sign In</v-btn>
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
            error:''
        }
    }
}
</script>