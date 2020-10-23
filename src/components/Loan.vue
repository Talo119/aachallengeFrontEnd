<template>
    <v-container>
        <v-row class="my-2" justify="end">
            <v-col xs6 color="secondary">
                <h1 class="secondary--text">Loans</h1>
            </v-col>

            <v-col class="text-end" xs6>
                <v-row justify="end">
                    <v-dialog v-model="loans.dialog" persistent max-width="500px">
                        <template v-slot:activator="{on, attrs}">
                            <v-btn class="mx-2" fab dark color="primary" v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline secondary--text">New Loan</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            
                                            <v-select v-model="loans.idclient"
                                                :items="loans.clients" label="Client">
                                            </v-select>
                                            
                                        </v-col>

                                        <v-col cols="4">
                                            <v-text-field
                                                label="Capital"
                                                required
                                                type="number"
                                                v-model="loans.capital"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="4">
                                            <v-text-field
                                                label="Interest Rate"
                                                required
                                                type="number"
                                                v-model="loans.interest_rate"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="4">
                                            <v-text-field
                                                label="Period (Months)"
                                                required
                                                type="number"
                                                v-model="loans.period"
                                            ></v-text-field>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions class="text-end">
                                <v-btn
                                    color="primary"
                                    text
                                    class="text-end"
                                    @click="loans.dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    text
                                    class="text-end"
                                    @click="loans.dialog = false"
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
                    v-model="loans.search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
            </v-card-title>

            <v-data-table
                :header="loans.header"
                :items="loans.list"
                :search="loans.search">

            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            loans:{
                dialog:false,
                list:[],
                header:[
                    {text:'# Loan', value:'idloan'},
                    {text:'Client', value:'client'},
                    {text:'Capital', value:'capital'},
                    {text:'Interest Rate', value:'interest_rate'},
                    {text:'Period', value:'period'},
                    {text:'Interest to Pay', value:'interest_to_pay'},
                    {text:'Amount to Finance', value:'amount_to_finance'},
                    {text:'Fee', value:'fee'},
                    {text:'Date', value:'created_dt'},
                    {text:'Actions', value:'actions'},
                ],
                search:'',
                editedIndex:-1,
                idclient:'',
                capital:0,
                interest_rate:0,
                interest_to_pay:0,
                amount_to_finance:0,
                period:0,
                fee:0,                
                clients:[
                    //{text:'Jorge Ramirez', value:'1'}
                ],
            },
        }
    },

    computed:{
        calculate(){
            let me = this;
            me.loans.interest_to_pay = 0;
            me.loans.amount_to_finance =0;
            me.loans.fee = 0;
            me.loans.interest_to_pay = me.loans.capital * (me.loans.interest_rate/100) * me.loans.period;
            me.loans.amount_to_finance = parseFloat(me.loans.capital) + parseFloat(me.loans.interest_to_pay);
            me.loans.fee = me.loans.amount_to_finance / me.loans.period;
        }
    },

    created(){
        this.list();
        this.selectClient();
    },

    methods:{
        list(){
            let me = this;            
            axios.get('api/Loans/List').then(function(response){
                    me.loans.list = response.data;
                }).catch(function(error){
                    console.log(error);
                });
        },

        selectClient(){
            let me = this;
            var clientsArray=[];
            axios.get('api/Clients/SelectClients').then(function(response){                    
                clientsArray = response.data;  
                clientsArray.map(function(x){
                    me.loans.clients.push({text:x.name, value:x.idclient});
                });
            }).catch(function(error){
                console.log(error);
            });
        }
    }

}
</script>