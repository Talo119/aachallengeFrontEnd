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

                                        <v-col cols="12" v-show="valid">
                                            <div class="red--text" v-for="v in validMessage" :key="v" v-text="v"></div>
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
                                    @click="closeFormLoan()"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    text
                                    class="text-end"
                                    @click="save()"
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
                :headers="loans.header"
                :items="loans.list"
                :search="loans.search">
                <template v-slot:item.actions="{ item }">
                    <v-row>
                        <v-col class="mx-0" cols="6">
                            <v-btn                                
                                icon
                                class="mx-0"
                                @click="editItem(item)"
                                color="green"
                                >
                                <v-icon dark>
                                    mdi-wallet-plus-outline
                                </v-icon>
                            </v-btn>                            
                        </v-col>

                        <v-col class="mx-0" cols="6">
                            <v-btn                                
                                icon
                                class="mx-0"
                                @click="editItem(item)"
                                color="red"
                                >
                                <v-icon dark>
                                    mdi-close-circle-outline
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                                            
                    
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
                period:1,
                fee:0,                
                clients:[
                    //{text:'Jorge Ramirez', value:'1'}
                ],
               
            },

            valid:0,
            validMessage:[]

        }
    },

    computed:{
        
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
        },

        calculate(){
            let me = this;
            me.loans.interest_to_pay = 0;
            me.loans.amount_to_finance = 0;
            me.loans.fee = 0;
            me.loans.interest_to_pay = (me.loans.capital * (me.loans.interest_rate/100) * me.loans.period).toFixed(2);
            me.loans.amount_to_finance = (parseFloat(me.loans.capital) + parseFloat(me.loans.interest_to_pay)).toFixed(2);
            me.loans.fee = (me.loans.amount_to_finance / me.loans.period).toFixed(2);
        },

        validate(){
            let me = this;
            me.valid = 0;
            me.validMessage = [];

            if(!me.loans.idclient || me.loans.idclient == 0){
                me.validMessage.push("You must enter the Client.")
            }

            if(!me.loans.capital || me.loans.capital == 0){
                me.validMessage.push("You must enter the capital.")
            }

            if(!me.loans.interest_rate || me.loans.interest_rate == 0){
                me.validMessage.push("You must enter the interest rate.")
            }

            if(!me.loans.period || me.loans.period == 0){
                me.validMessage.push("You must enter the interest rate.")
            }

            if(me.validMessage.length > 0){
                me.valid = 1;
            }

            return me.valid;

        },

        cleanLoan(){
            let me = this;
            me.loans.idclient = '';
            me.loans.capital = 0;
            me.loans.interest_rate = 0;
            me.loans.period = 1;
            me.loans.interest_to_pay = 0;
            me.loans.amount_to_finance = 0;
            me.loans.fee = 0;      
        },

        closeFormLoan(){
            let me = this;
            me.cleanLoan();
            me.loans.dialog = false;
            me.valid = 0;
            me.validMessage = [];
        },

        save(){
            let me = this;

            if(me.validate()){
                return;
            }

            me.calculate();
            axios.post('api/Loans/CreateLoan',{
                'idclient': me.loans.idclient,
                'capital': me.loans.capital,
                'interest_rate': me.loans.interest_rate,
                'period': me.loans.period,
                'interest_to_pay': me.loans.interest_to_pay,
                'amount_to_finance': me.loans.amount_to_finance,
                'fee': me.loans.fee,
            }).then(function (response){
                me.loans.dialog = false;
                me.list();
            }).catch(function(error){
                console.log(error);
            })
        }

    }

}
</script>