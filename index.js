import 'babel-polyfill'
import * as constants from './constants'
import Vue from 'vue/dist/vue.esm.js'

const uportConnect = require('uport-connect');
const qrcode = require('qrcode-terminal');

const uport = new uportConnect.Connect(constants.appName, {
    //uriHandler,
    clientId: constants.mnidAddress,
    network: constants.network,
    signer: uportConnect.SimpleSigner(constants.signingKey)
});

let creds = null;
let receiver = '';

new Vue({
    el: '#app',
    data: {
      user: null,
      atLeast18: false
    },
    methods: {
      login: function() {
        let app = this
        // Request credentials
        uport.requestCredentials({
            requested: ['name', 'avatar', 'address', 'publicKey', 'publicEncKey', 'DoB'],
            notifications: true
        }).then((credentials) => {
            app.user = credentials;
            receiver = credentials.did;
            creds = credentials;
            app.atLeast18 = this.isOver18(credentials.DoB);
        }).then(() => {
          if(creds.avatar.uri!=null){
            document.getElementById("avatarImg").src=creds.avatar.uri;
          }
        })
      },
      logout: function() {
        this.user = null
      },
      isOver18: function(dateData) {
        let date = new Date(dateData);
        return new Date(date.getFullYear()+18, date.getMonth()-1, date.getDay()) <= new Date();
      },
      issueMemCard: function() {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date();
        let membershipID = Math.floor((Math.random() * 99999999) + 11111111);
        uport.attestCredentials({
          sub: receiver,
          claim: { 'Membership Card': "Verified member of Casino Ledgericus since "+ date.toLocaleDateString("en-US", options) + ". Membership ID: " + membershipID},
        })
      }
    },
  })
  
