<template>
    <v-container>
        <v-row class="my-2" justify="end">
            <v-col xs6 color="secondary">
                <h1 class="headline secondary--text" >Clients</h1>
            </v-col>

            <v-col xs6 class="text-end" >
                <v-row justify="end">
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-if="$store.state.user.role == 'Credits'" class="mx-2" small fab dark color="primary" v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>                    
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline secondary--text">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Name"
                                                required
                                                v-model="name"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Address"
                                                required
                                                v-model="address"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Phone Number"
                                                required
                                                v-model="phone_number"                                                
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Email"
                                                v-model="email"
                                                required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                label="Credit Limit"
                                                required
                                                v-model="credit_limit"
                                                type="number"
                                            ></v-text-field>
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
                                    @click="closeForm()"
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
                    <v-btn class="mx-2" fab small dark color="primary">
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
            search:"",
            editedIndex: -1,
            idclient:'',          
            name:'', 
            address:'', 
            phone_number:'',
            email:'',
            credit_limit:0.0,
            valid:0,
            validMessage:[],
            formTitle:'New Client'

            
        }
    },

    cumputed:{
        
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
        },

        validate(){
            let me = this;
            me.valid = 0;
            me.validMessage = [];
            if(me.name.length < 3 || me.name.length > 50){
                me.validMessage.push("The Name should be have more than 3 characteres and minus than 50 characteres.")
            }

            if(me.address.length < 30 || me.address.length > 250){
                me.validMessage.push("The Address should be have more than 30 characteres and minus than 250 characteres.")
            }

            if(me.phone_number.length < 8 || me.phone_number.length > 20){
                me.validMessage.push("The Phone number should be have more than 7 characteres and minus than 20 characteres.")
            }
            if(!me.credit_limit || me.credit_limit == 0){
                me.validMessage.push("You must enter the credit limit.")
            }

            if(me.validMessage.length > 0){
                me.valid = 1;
            }

            return me.valid;            
        },

        save(){            
            
            if(this.validate()){
                return;
            }
            if(this.editedIndex > -1){
                //Edit
                let me = this;
                axios.put('api/Clients/ActualizeClient',{
                    'idclient': me.idclient,
                    'name': me.name,
                    'address': me.address,
                    'phone_number': me.phone_number,
                    'email': me.email,
                    'credit_limit' : me.credit_limit
                }).then(function(response){
                    me.dialog = false;
                    me.cleanUp();
                    me.list();
                }).catch(function(error){
                    console.log(error);
                })
            }else{
                //Create
                let me = this;
                axios.post('api/Clients/CreateClient',{
                    'name': me.name,
                    'address': me.address,
                    'phone_number': me.phone_number,
                    'email': me.email,
                    'credit_limit' : me.credit_limit
                }).then(function(response){
                    me.dialog = false;
                    me.cleanUp();
                    me.list();
                }).catch(function(error){
                    console.log(error);
                })
            }


            
        },

        editItem(item){
            this.idclient = item.idclient;
            this.name = item.name;
            this.address = item.address;
            this.phone_number = item.phone_number;
            this.email = item.email;
            this.credit_limit = item.credit_limit;
            this.editedIndex = 1;
            this.dialog = true;
            this.formTitle = 'Edit Client';
        },
        
        closeForm(){
            this.cleanUp();
            this.dialog = false;
            this.valid = 0;
            this.validMessage = [];
        },

        cleanUp(){
            let me = this;
            me.name = '',
            me.address = '',
            me.phone_number = '',
            me.email = '',
            me.credit_limit = 0,
            me.editedIndex = -1,
            me.formTitle = 'New Client'
        },
    }

}
</script>
