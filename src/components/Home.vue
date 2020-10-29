<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <v-sheet
            class="v-sheet--offset mx-auto"
            color="red"
            elevation="12"
            max-width="calc(100% - 32px)"
        >
            <v-sparkline
                :labels="months"
                :value="values"
                color="white"
                line-width="2"
                padding="6"
            >
            </v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
                Loans per Month
            </div>
        </v-card-text>
      </v-col>

      <v-col cols="6">

      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
        months:[
            'Enero',
            'Febrero',
            'Marzo'
        ],
        values:[
            '1000',
            '2000',
            '3000'
        ]

    }),
  }
</script>