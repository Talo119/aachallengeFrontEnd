<template>
  <v-container fluid>
    <v-row align="center">
      <v-col  cols="6">
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
                :labels="months"
                :value="values"
                color="white"
                line-width="2"
                padding="16"
            >
            </v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0 mt-6">
              <div class="title font-weight-light mb-4">
                  <strong>
                    Loans per Month
                  </strong>
                  
              </div>
          </v-card-text>
        </v-card>
        
      </v-col>

      <v-col  cols="6">
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
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({

      months:[
            'Enero',
            'Febrero',
            'Marzo'
        ],
        values:[
            1500,
            1300,
            3000
        ],

        clients:[
          'Juan',
          'Carlos',
          'Mario'
        ],

        loans:[
          10000,
          5500,
          17500

        ],

      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
