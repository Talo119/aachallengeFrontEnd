<template>
    <v-container>
        <v-row class="my-2" justify="end">
            <v-col xs6 color="secondary">
                <h1 class="secondary--text" >Clients</h1>
            </v-col>

            <v-col xs6 class="text-end" >
                <v-row justify="end">
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" fab dark color="primary" v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>                    
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline secondary--text">New Client</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Name"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Address"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Phone Number"
                                                required
                                                type="number"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Email"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Credit Limit"
                                                required
                                                type="number"
                                            ></v-text-field>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-row>
            </v-col>
        </v-row> 
    

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
            </v-card-title>

            <v-data-table
                :headers="header"
                :items="clients"
                :search="search">
                <template v-slot:item.credit_limit="{ item }">
                    L.{{ item.credit_limit }}                        
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn
                        class="mx-2"
                        fab
                        dark
                        x-small
                        color="secondary"
                        >
                        <v-icon dark>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                </template>

            </v-data-table>            
        </v-card>

    </v-container>    
</template>
<script>
import axios from 'axios'
export default {
    
    data(){
        return{
            dialog:false,
            clients:[
                //{name:'Oscar Perdomo', address:'Barrio Guamilito',phone_number:'9645-1423',email:'oscarp@gmail.com',credit_limit:'5000'}
            ],
            header:[
                {text:'Name', value:'name'},
                {text:'Address', value:'address'},
                {text:'Phone Number', value:'phone_number'},
                {text:'Email', value:'email'},
                {text:'Credit Limit', value:'credit_limit'},
                {text:'Actions', value:'actions'},
            ],
            search:""
            
        }
    },

    created(){
        this.list();
    },

    methods:{
        list(){
            let me = this;
            axios.get('api/Clients/List').then(function(response){
                    me.clients = response.data;
                }).catch(function(error){
                    console.log(error);
                });
        }
    }

}
</script>
