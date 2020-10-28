<template>
  <v-app id="inspire">
    <v-system-bar app v-if="login">
      <v-spacer></v-spacer>
      <span>{{ $store.state.user.nombre }}</span>
      <span>{{ $store.state.user.role }}</span>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>

    </v-system-bar>
    <v-app-bar v-if="login" color="primary" app>
      
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Credit Control</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text             
        @click="logOut()"
        class="white--text"
        v-if="login" 
      >
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
        
      
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
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Credits
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item  :to="{name: 'Client'}" v-if="isAdmin || isCredits">
          
              <v-list-item-action>
                <v-icon>mdi-account-box-multiple</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title color="red lighten-2">
                  Clients
                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>

            <v-list-item :to="{name:'Loan'}" v-if="isAdmin || isCredits || isCharges">
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

          </v-list-group>
        </template>

        <template v-if="isAdmin">
          <v-list-group>

            <v-list-item slot="activator">
                <v-list-item-content>
                  <v-list-item-title>
                    Admin
                  </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{name:'Role'}">
              <v-list-item-action>
                <v-icon>
                  mdi-folder-account
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Roles
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item :to="{name:'User'}">
              <v-list-item-action>
                <v-icon>
                  mdi-clipboard-account
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Users
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

  computed:{
    login(){
      return this.$store.state.user;
    },

    isAdmin(){
      return this.$store.state.user && this.$store.state.user.role == 'Admin';
    },

    isCredits(){
      return this.$store.state.user && this.$store.state.user.role == 'Credits';      
    },

    isCharges(){
      return this.$store.state.user && this.$store.state.user.role == 'Charges';
    }
  },

  created(){
    this.$store.dispatch("autoLogin");
  },

  methods:{
    logOut(){
      this.$store.dispatch("out");
    }
  }

};
</script>
