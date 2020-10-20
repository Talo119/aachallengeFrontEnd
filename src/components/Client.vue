<template>
    <v-container>
        <h1>Clients</h1>

        <v-card>
            <v-card-title>
                <v-text-field sm12
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
                <v-data-table sm12
                    :headers="header"
                    :items="clients"
                    :search="search">

                </v-data-table>
            </v-card-title>
        </v-card>

    </v-container>    
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            clients:[],
            header:[
                {text:'Name', value:'name'},
                {text:'Address', value:'address'},
                {text:'Phone Number', value:'phone_number'},
                {text:'Email', value:'email'},
                {text:'Credit Limit', value:'credit_limit'},
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
