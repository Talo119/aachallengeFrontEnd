<template>
    <v-container>
        <v-row>
            <v-col xs12 color="secondary">
                <h1 class="headline secondary--text" >Roles</h1>
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
                :items="roles"
                :search="search"
            >

            </v-data-table>

        </v-card>

    </v-container>
</template>

<script>
import axios from 'axios'
export default {

    data(){
        return{
            search:'',
            header:[
                {text:'ID', value:'idrole'},
                {text:'Role', value:'name'},
                {text:'Description', value:'description'},
                {text:'Condition', value:'condicion'},
            ],
            roles:[]
        }
    },

    created(){
        this.list();
    },

    methods:{
        list(){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuration= {headers: header};
            axios.get('api/Roles/List',configuration).then(function(response){
                me.roles = response.data;
            }).catch(function(error){
                console.log(error);
            });
        }
    }

}
</script>