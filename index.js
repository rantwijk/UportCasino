import 'babel-polyfill'
import * as constants from './constants'
import Vue from 'vue/dist/vue.esm.js'
import {
  SimpleSigner,
  verifyJWT
} from 'did-jwt';

const uportConnect = require('uport-connect');
const qrcode = require('qrcode-terminal');
const signer = SimpleSigner(constants.signingKey);

const uport = new uportConnect.Connect(constants.appName, {
  //uriHandler,
  clientId: constants.mnidAddress,
  network: constants.network,
  signer: uportConnect.SimpleSigner(constants.signingKey)
});

const jwToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NDM1ODQyNDYsImV4cCI6MTU0MzY3MDY0NiwiYXVkIjoiMm9xRXREakJHVXBpSjJDaGNKYzltRkhFNnpQVEZteTM4djUiLCJ0eXBlIjoic2hhcmVSZXNwIiwibmFkIjoiMm9kRDFFMjJHc29zcUtlSkV3VTlaNGZKaVY5Qm04RXJ1WUwiLCJvd24iOnsibmFtZSI6IkNoYXJsaWUgdmFuIFJhbnR3aWprIiwiYXZhdGFyIjp7InVyaSI6Imh0dHBzOi8vaXBmcy5pbmZ1cmEuaW8vaXBmcy9RbWNtbmhhUWRHUzlWaExuNk5YUWkxYWNSZlNySm9EeXhXdFc1S2s4OXNtNXBHIn19LCJyZXEiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc2lmUS5leUpwWVhRaU9qRTFORE0xT0RReU16QXNJbkpsY1hWbGMzUmxaQ0k2V3lKdVlXMWxJaXdpWVhaaGRHRnlJaXdpWVdSa2NtVnpjeUlzSW5CMVlteHBZMHRsZVNJc0luQjFZbXhwWTBWdVkwdGxlU0lzSWtSdlFpSmRMQ0p3WlhKdGFYTnphVzl1Y3lJNld5SnViM1JwWm1sallYUnBiMjV6SWwwc0ltTmhiR3hpWVdOcklqb2lhSFIwY0hNNkx5OWphR0Z6Y1hWcExuVndiM0owTG0xbEwyRndhUzkyTVM5MGIzQnBZeTlWVVd4UVIwNWtOV1pGVjNCRFduaDNJaXdpYm1WMElqb2lNSGcwSWl3aWRIbHdaU0k2SW5Ob1lYSmxVbVZ4SWl3aWFYTnpJam9pTW05eFJYUkVha0pIVlhCcFNqSkRhR05LWXpsdFJraEZObnBRVkVadGVUTTRkalVpZlEuQ2JSME1MNnhkLXFlMkpFaXg2aDVONU1NY0tCRTJ6MlNZUldObTdnbllSc19Oa2ZLSjlPSmhvSllRQWRwRUNWd2lHTkgxczhNMi1YWWF5ZlNYVlB4YXciLCJjYXBhYmlsaXRpZXMiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlV6STFOa3N0VWlKOS5leUpwWVhRaU9qRTFORE0xT0RReU5EWXNJbVY0Y0NJNk1UVTBORGc0TURJME5pd2lZWFZrSWpvaU1tOXhSWFJFYWtKSFZYQnBTakpEYUdOS1l6bHRSa2hGTm5wUVZFWnRlVE00ZGpVaUxDSjBlWEJsSWpvaWJtOTBhV1pwWTJGMGFXOXVjeUlzSW5aaGJIVmxJam9pWVhKdU9tRjNjenB6Ym5NNmRYTXRkMlZ6ZEMweU9qRXhNekU1TmpJeE5qVTFPRHBsYm1Sd2IybHVkQzlIUTAwdmRWQnZjblF2WXpjMFl6Wm1Zell0TXpVeFppMHpNVFE0TFRnek4ySXRNell5WVRjell6TTBNRE14SWl3aWFYTnpJam9pWkdsa09tVjBhSEk2TUhnNU5UZGxaRGRsTTJSaFpEWTFZMlZpTWpnMU5qWXhOR0ZqTkRObVpqQm1PRGc0WkdRd1pEWTFJbjAubm5KVlVZazVPaXBzNjd2Vml4SzBodDRvRGp2TFVsU1JYdFg3SXQtZ2tGbU42Z09mQmEtRi1ycEJmS21oOE1hV0pRWjBsZlk1MGNROGZYOFlOWnhsWFFBIl0sInB1YmxpY0VuY0tleSI6IjBqUWhTR3cyMndVYmFDbC9hN1c2SS9RdnlISEwwR0JSWjIyRXJoZ2k1eUk9IiwiYm94UHViIjoiMGpRaFNHdzIyd1ViYUNsL2E3VzZJL1F2eUhITDBHQlJaMjJFcmhnaTV5ST0iLCJpc3MiOiJkaWQ6ZXRocjoweDk1N2VkN2UzZGFkNjVjZWIyODU2NjE0YWM0M2ZmMGY4ODhkZDBkNjUifQ.onBos9e0s2vlcbf75Sz40SlvYrz6SPpuoQWiKMZpgzik16BD6IVJwkfJqCGZ1hw5nJOVljpBfTr1uJO0lK4ClAA';

let creds = null;
let receiver = '';

new Vue({
  el: '#app',
  data: {
    user: null,
    atLeast18: false
  },
  methods: {
    login: function () {
      let app = this
      console.log("Starting login process");
      // Request credentials
      uport.requestCredentials(
        {
        requested: ['name', 'avatar', 'address', 'publicKey', 'publicEncKey', 'DoB'],
        notifications: true
      }).then((credentials) => {
        app.user = credentials;
        receiver = credentials.did;
        creds = credentials;
        app.atLeast18 = this.isOver18(credentials.DoB);
        console.log(credentials);
      }).then(() => {
        if (creds.avatar.uri != null) {
          document.getElementById("avatarImg").src = creds.avatar.uri;
        }

        verifyJWT(jwToken, {
          auth: 1,
          audience: '2oqEtDjBGUpiJ2ChcJc9mFHE6zPTFmy38v5'
        }).then((response) => {
          console.log(response);
        });
      })
    },
    logout: function () {
      this.user = null
    },
    isOver18: function (dateData) {
      let date = new Date(dateData);
      return new Date(date.getFullYear() + 18, date.getMonth() - 1, date.getDay()) <= new Date();
    },
    issueMemCard: function () {
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      let date = new Date();
      let membershipID = Math.floor((Math.random() * 99999999) + 11111111);
      uport.attestCredentials({
        sub: receiver,
        claim: {
          'Membership Card': "Verified member of Casino Ledgericus since " + date.toLocaleDateString("en-US", options) + ". Membership ID: " + membershipID,
          'cronos-ams-employee': 1,
          'Digitalid':'1',
          'Digitale ID Zug':'Yes'
        },
      })
    }
  },
})