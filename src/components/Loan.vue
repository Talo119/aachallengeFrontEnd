<template>
    <v-container>
        <v-row v-if="details == 0" class="my-2" justify="end">
            <v-col xs6 color="secondary">
                <h1 class="headline secondary--text">Loans</h1>
            </v-col>

            <v-col class="text-end" xs6>
                <v-row justify="end" class="mr-sm-1">
                    <v-dialog v-model="loans.dialog" persistent max-width="500px">
                        <template v-slot:activator="{on, attrs}">
                            <v-btn v-if="$store.state.user.role == 'Credits'" class="mx-2" fab small dark color="primary" v-bind="attrs" v-on="on">
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
                    <v-btn class="mx-2" fab small dark color="primary">
                        <v-icon>mdi-printer-settings</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>

        <v-card v-if="details == 0">
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

                <template v-slot:item.capital="{item}">
                    {{item.capital.toFixed(2)}}
                </template>

                <template v-slot:item.interest_to_pay="{item}">
                    {{item.interest_to_pay.toFixed(2)}}
                </template>

                <template v-slot:item.amount_to_finance="{item}">
                    {{item.amount_to_finance.toFixed(2)}}
                </template>

                <template v-slot:item.fee="{item}">
                    {{item.fee.toFixed(2)}}
                </template>
                
                <template v-slot:item.condicion="{item}">
                    <v-chip v-if="item.condicion" class="white--text" color="green" x-small>Active</v-chip>
                    <v-chip v-else color="red" class="white--text" x-small>Canceled</v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-row>
                        <v-col class="mx-0" cols="4">
                            <v-btn                                
                                icon
                                class="mx-0"
                                @click="addPayment(item)"
                                color="green"
                                >
                                <v-icon dark>
                                    mdi-wallet-plus-outline
                                </v-icon>
                            </v-btn> 
                            <v-dialog v-model="payments.dialog" persistent max-width="400px">                                
                                <v-card>
                                    <v-card-title>
                                        <v-row>
                                            <v-col cols="12" class="mb-sm-0 pb-sm-0">
                                                <span class="headline secondary--text mb-sm-0 pb-md-0">
                                                    Add Payment
                                                </span>
                                            </v-col>
                                            <v-col cols="12" class="mt-sm-0 pt-sm-0">
                                                <div class="subtitle-2 info--text mt-sm-0 pt-sm-0">
                                                    <v-icon>mdi-pound-box-outline</v-icon>
                                                     {{payments.idloan}} 
                                                    <v-icon>mdi-account-box-outline</v-icon>
                                                     {{payments.client}}
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        label="Amount"
                                                        required
                                                        type="number"
                                                        v-model="payments.amount"
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
                                            @click="closePayment()"
                                        >
                                            Close
                                        </v-btn>
                                        <v-btn
                                            color="primary"
                                            text
                                            @click="savePayment(item)"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>                                                    
                        </v-col>

                        <v-col class="mx-0" cols="4">
                            <v-btn                                
                                icon
                                class="mx-0"
                                @click="showDetails(item.idloan)"
                                color="orange"
                                >
                                <v-icon dark>
                                    mdi-card-search-outline
                                </v-icon>
                            </v-btn>
                        </v-col>

                        <v-col class="mx-0" cols="4">
                            <v-btn
                                v-if="item.condicion"                         
                                icon
                                class="mx-0"
                                @click="showCancel(item)"
                                color="red"
                                >
                                <v-icon dark>
                                    mdi-close-circle-outline
                                </v-icon>
                            </v-btn>  
                            <v-dialog
                                v-model="loans.cancel.dialogCancel"
                                persistent
                                max-width="290"
                            >                                
                                <v-card>
                                    <v-card-title class="headline">
                                        Cancel item?
                                    </v-card-title>
                                    <v-card-text>
                                        You are about to cancel the loan # {{loans.cancel.idloan}}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="closeCancel()">Close</v-btn>
                                        <v-btn text color="primary" @click="cancelLoan()">Cancel</v-btn>
                                    </v-card-actions>
                                </v-card>

                            </v-dialog>
                            
                        </v-col>
                    </v-row>
                                            
                    
                </template>
            </v-data-table>
        </v-card>

        <v-row v-if="details == 1">
            <v-col xs-12>
                <v-card>
                    <v-card-title>
                        <v-row>
                            <v-col xs6>
                                <span class="headline secondary--text">Details</span>
                                
                            </v-col>
                            <v-col xs6 class="text-end">
                                <v-btn small class="mx-2" dark color="primary" justify="end">
                                    <v-icon>mdi-printer-settings</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                        
                    </v-card-title>

                    <v-card-text>
                        <v-data-table
                            :headers="payments.header"
                            :items="payments.list"
                        >

                        <template v-slot:item.condicion="{item}">
                            <v-chip v-if="item.condicion" class="white--text" color="green" x-small>Active</v-chip>
                            <v-chip v-else color="red" class="white--text" x-small>Canceled</v-chip>
                        </template>

                        <template v-slot:item.cancel="{item}">
                            <v-btn
                                v-if="item.condicion"                         
                                icon
                                class="mx-0"
                                @click="showCancelPayment(item)"
                                color="red"
                                >
                                <v-icon dark>
                                    mdi-close-circle-outline
                                </v-icon>
                            </v-btn>

                            <v-dialog
                                v-model="payments.cancel.dialogCancel"
                                persistent
                                max-width="290"
                            >                                
                                <v-card>
                                    <v-card-title class="headline">
                                        Cancel item?
                                    </v-card-title>
                                    <v-card-text>
                                        You are about to cancel the payment # {{payments.cancel.idpayment}}
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="closeCancelPayment()">Close</v-btn>
                                        <v-btn text color="primary" @click="cancelPayment()">Cancel</v-btn>
                                    </v-card-actions>
                                </v-card>

                            </v-dialog>

                        </template>


                        </v-data-table>

                        <v-row class="info--text">
                            <v-col  xs12>
                                <strong>Balance:</strong>
                                L.{{ loans.balance.toFixed(2) }}
                            </v-col>                            
                        </v-row>
                        <v-row class="green--text">
                            <v-col xs12>
                                <strong>Total Payments:</strong>
                                L.{{ payments.totalPayments.toFixed(2) }}
                            </v-col>
                        </v-row>

                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="primary"
                            text
                            class="text-end"
                            @click="closeDetails()"
                        >
                            Close
                        </v-btn>
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
            loans:{
                dialog:false,                
                list:[
                    //{idloan:'1',client:'Jorge Ramirez',capital:'1000',interest_rate:'2',period:'12',interest_to_pay:'0',amount_to_finance:'0',fee:'0',created_dt:'2020-10-23'}
                ],
                header:[
                    {text:'# Loan', value:'idloan'},
                    {text:'Client', value:'client'},
                    {text:'Capital (L.)', value:'capital'},
                    {text:'Rate (%)', value:'interest_rate'},
                    {text:'Period (Months)', value:'period'},
                    {text:'Interests (L.)', value:'interest_to_pay'},
                    {text:'Amount (L.)', value:'amount_to_finance'},
                    {text:'Fee (L.)', value:'fee'},
                    {text:'Date', value:'created_dt'},
                    {text:'Condition', value:'condicion'},
                    {text:'Actions', value:'actions'},
                ],
                search:'',
                editedIndex:-1,
                idloan:'',
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
                balance:0.0,  
                cancel:{
                    dialogCancel:false,
                    idloan:''
                }               
            },

            payments:{
                dialog:false,
                idloan:'',
                client:'',
                amount:0,
                list:[],
                header:[
                    {text:'# Payment', value:'idpayment'},
                    {text:'Amount (L.)', value:'amount'},
                    {text:'Date', value:'created_dt'},
                    {text:'Condition', value:'condicion'},
                    {text:'Cancel', value:'cancel'},
                ],
                cancel:{
                    dialogCancel:false,
                    idpayment:''
                },
                totalPayments:0.0
            },

            valid:0,
            validMessage:[],
            details:0
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

        addPayment(item){
            let me = this;
            me.payments.dialog = true;
            me.payments.idloan = item.idloan;
            me.payments.client = item.client;
        },

        closePayment(){
            this.payments.dialog = false;
            this.payments.idloan = '';
            this.payments.client = '';
            this.payments.amount = 0;
        },

        showCancel(item){
            let me = this;
            me.loans.cancel.dialogCancel = true;
            me.loans.cancel.idloan = item.idloan;
        },

        closeCancel(item){
            let me = this;
            me.loans.cancel.dialogCancel = false;
            me.loans.cancel.idloan = '';
        },
        
        closeCancelPayment(){
            let me = this;
            me.payments.cancel.dialogCancel = false;
            me.payments.cancel.idpayment = '';
        },

        validate(action){
            let me = this;
            me.valid = 0;
            me.validMessage = [];

            if (action == 'Loan'){
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
            } else if (action == 'Payment')
            {
                 if(!me.payments.amount || me.payments.amount == 0){
                    me.validMessage.push("You must enter the amount.")
                }
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

            if(me.validate('Loan')){
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
        },
        
        savePayment(){
            let me = this;
            if(me.validate('Payment')){
                return;
            }
            axios.post('api/Payments/Create',{
                'idloan' : me.payments.idloan,
                'amount' : me.payments.amount
            }).then(function (response){
                me.payments.dialog = false;
                me.payments.amount = '';
            }).catch(function(error){
                console.log(error);
            })
        },

        cancelLoan(){
            let me = this;
            axios.put('api/Loans/Cancel/'+me.loans.cancel.idloan,{}).then(function(response){
                me.loans.cancel.idloan = '';
                me.loans.cancel.dialogCancel = false;
                me.list();                        
            }).catch(function(error){
                console.log(error);
            });
        },

        cancelPayment(){
            let me = this;
            axios.put('api/Payments/Cancel/'+me.payments.cancel.idpayment,{}).then(function(response){                
                me.payments.cancel.dialogCancel = false;
                me.payments.cancel.idpayment = '';
                me.showDetails(me.loans.idloan);
            }).catch(function(error){
                console.log(error);
            });
        },
        
        calculatedBalance(idloan){
            let me = this;
            var totalPayments = 0.0;
            var amountToFinance = 0.0;
            var balance = 0.0;
            
            me.payments.list.map(function(x){
                if(x.condicion){
                    totalPayments = totalPayments + x.amount;                    
                }
            });
            me.payments.totalPayments = totalPayments;

            me.loans.list.map(function(y){
                if(y.idloan == idloan){
                    amountToFinance = y.amount_to_finance;
                }
            });

            balance = amountToFinance - totalPayments;
            
            return me.loans.balance =  balance;

        },

        showCancelPayment(item){
            let me = this;
            me.payments.cancel.dialogCancel = true;
            me.payments.cancel.idpayment = item.idpayment;
        },

        showDetails(idloan){
            let me = this;
            me.details = 1;
            me.loans.idloan = idloan;            
            axios.get('api/Payments/ListDetail/'+idloan).then(function(response){
                me.payments.list = response.data;
                me.calculatedBalance(idloan);
            }).catch(function(error){
                console.log(error);
            });
        },

        closeDetails(){
            let me = this;
            me.details = 0;
        }
    }

}
</script>