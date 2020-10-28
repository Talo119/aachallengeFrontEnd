<template>
    <v-container>
        <v-row>
            <v-col xs6>
                <h1 class="headline secondary--text">Users</h1>
            </v-col>

            <v-col xs6 class="text-end">
                <v-row justify="end">
                    <v-dialog v-model="dialog" persistent max-width="400px">
                        <template v-slot:activator="{ on, attrs}">
                            <v-btn class="mx-2" small fab dark color="primary" v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>                    
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline secondary--text">New User</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Name"
                                                required
                                                v-model="nombre"
                                            >
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select
                                                v-model="idrole"
                                                :items="roles"
                                                label="Role"
                                                required
                                            >
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Email"
                                                v-model="email"
                                                required
                                            >
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                type="password"
                                                label="Password"
                                                v-model="password"
                                                required
                                            >
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" v-show="valid">
                                            <div class="red--text" v-for="v in validMessage" :key="v" v-text="v"></div>
                                        </v-col>                              

                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="close()"
                                >
                                    Close
                                </v-btn>

                                <v-btn
                                    color="primary"
                                    text
                                    @click="save()"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                    <v-btn class="mx-2" small fab dark color="primary">
                        <v-icon>mdi-printer-settings</v-icon>
                    </v-btn>
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
                :items="users"
                :search="search"
            >               

                <template v-slot:item.actions="{ item }">
                    <v-btn
                        class="mx-2"
                        fab
                        dark
                        x-small
                        @click="editItem(item)"
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
            roles:[],
            users:[],
            header:[
                { text: 'ID', value: 'iduser' },
                { text: 'Role', value: 'role' },
                { text: 'Name', value: 'nombre' },
                { text: 'Email', value: 'email' },
                { text: 'Condition', value: 'condicion' },
                { text: 'Actions', value: 'action' },
            ],
            search:'',
            valid:0,
            validMessage:[],
            iduser:'',
            idrole:'',
            nombre:'',
            email:'',
            password:''
        }
    },

    created(){
        this.list();
        this.select();
    },

    methods:{
        list(){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuration= {headers: header};        
            axios.get('api/Users/List',configuration).then(function(response){
                    me.users = response.data;
                }).catch(function(error){
                    console.log(error);
                });
        },

        close(){
            let me= this;
            me.dialog = false;
            me.cleanUp();
        },

        cleanUp(){
            let me = this;
            me.idrole='',
            me.nombre='',
            me.email='',
            me.password=''
        },

        save(){
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuration= {headers: header};
            axios.post('api/Users/Create',{
                'idrole':me.idrole,
                'nombre':me.nombre,
                'email':me.email,
                'password':me.password
            },configuration).then(function(response){
                me.close();
                me.list();
                me.cleanUp();
            }).catch(function(error){
                console.log(error);
            });
        },

        select(){
            let me = this;
            var rolesArray=[];
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuration= {headers: header};
            axios.get('api/Roles/Select',configuration).then(function(response){                    
                rolesArray = response.data;  
                rolesArray.map(function(x){
                    me.roles.push({text:x.name, value:x.idrole});
                });
            }).catch(function(error){
                console.log(error);
            });
        },

    }
    
}
</script>