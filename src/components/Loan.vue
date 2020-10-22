<template>
    <container>
        <v-row class="my-2" justify="end">
            <v-col xs6 color="secondary">
                <h1 class="secondary--text">Loans</h1>
            </v-col>

            <v-col class="text-end" xs6>
                <v-row justify="end">
                    <v-dialog v-model="dialog" persistent max-width="500px">
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
                                <container>
                                    <v-row></v-row>
                                </container>
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
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
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
            </v-card-title>

            <v-data-table
                :header="header"
                :items="loans"
                :search="search">

            </v-data-table>
        </v-card>
    </container>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            loans:{
                dialog:false,
                loans:[],
                header:[],
                search:'',
                editedIndex:-1
            },
            

        }
    },
}
</script>