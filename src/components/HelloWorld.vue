<template>
  <v-container fluid>
    <v-row dense align="center">
      <v-col xs="12" sm="12" md="12" lg="6" xl="6">
        <v-card
          class="mt-4 mx-auto"          
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
                :labels="clients"
                :value="loans"
                color="white"
                line-width="2"
                padding="16"
            >
            </v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0 mt-6">
              <div class="title font-weight-light mb-4">
                  <strong>
                    Loans per Client
                  </strong>
                  
              </div>
          </v-card-text>
        </v-card>
        
      </v-col>

      <v-col  xs="12" sm="12" md="12" lg="6" xl="6">
        <v-card
          class="mt-4 mx-auto"          
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="light-green"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
                :labels="clientsP"
                :value="payments"
                color="white"
                line-width="2"
                padding="16"
            >
            </v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0 mt-6">
              <div class="title font-weight-light mb-4">
                  <strong>
                    Payments per Client
                  </strong>
                  
              </div>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',

    data: () => ({     
      loansValues:null,
      paymentsValues:null,
      clients:[],
      loans:[],
      clientsP:[],
      payments:[],

      
    }),

    methods:{
      getChartLoans(){
        let me = this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuration= {headers: header};
        axios.get('api/Loans/LoansPerClient',configuration).then(function(response){
            me.loansValues = response.data;
            me.loadLoans();
        }).catch(function(error){
            console.log(error);
        });
      },

      getChartPayments(){
        let me = this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuration= {headers: header};
        axios.get('api/Payments/PaymentsPerClient',configuration).then(function(response){
            me.paymentsValues = response.data;
            me.loadPayments();
        }).catch(function(error){
            console.log(error);
        });
      },

      loadLoans(){
        let me = this;
        let mesn ='';
        me.loansValues.map(function(x){          
          me.clients.push(x.label);
          me.loans.push(x.value);
        });  
      },

      loadPayments(){
        let me = this;
        let mesn ='';
        me.paymentsValues.map(function(x){          
          me.clientsP.push(x.label);
          me.payments.push(x.value);
        });  
      }

    },

    mounted(){
      this.getChartLoans();
      this.getChartPayments();
    }

  }
</script>
