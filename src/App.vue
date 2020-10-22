<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>

    </v-system-bar>
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Credit Control</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" 
      fixed 
      temporary 
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            Menu
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <template>
          <v-list-item link :to="{name: 'Home'}">
          
            <v-list-item-icon>
              <v-icon >mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >Home</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>
        
        <template>
          <v-list-item  :to="{name: 'Client'}">
          
            <v-list-item-action>
              <v-icon>mdi-account-box-multiple</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title color="red lighten-2">Clients</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Finance
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{name:'Loan'}">
              <v-list-item-action>
                <v-icon>
                  mdi-cash-multiple
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Loans
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{name:'Payment'}">
              <v-list-item-action>
                <v-icon>
                  mdi-wallet
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Payments
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-slide-x-transition mode="out-in">
          <router-view/>
        </v-slide-x-transition>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
    drawer:null
  }),
};
</script>
