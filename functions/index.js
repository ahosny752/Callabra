// AUTH CRENDENTIALS //copy into browser first
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/ahmedhosny/google-cloud-sdk/firebaseReact-85b29e09cde1.json"

const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth')
const cors = require('cors');
app.use(cors())

const { getAllScreams, addAScream } = require('./handlers/screams')
const {signUp, getUsers, login } = require('./handlers/users')

// Scream Route
app.get('/screams', getAllScreams )
app.post('/screams', FBAuth, addAScream )


//signup route
app.post('/signup', signUp);
app.post('/login', login )

exports.api = functions.https.onRequest(app)

