// AUTH CRENDENTIALS //copy into browser first
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/ahmedhosny/google-cloud-sdk/firebaseReact-85b29e09cde1.json"

const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth')
const cors = require('cors');
app.use(cors())

const { getAuthenticatedUserPosts, getAllPosts ,addAPost} = require('./handlers/screams')
const {signUp, login, getAuthenticatedUser, addAFriend } = require('./handlers/users')

// posts Route
app.get('/posts', getAllPosts)
app.get('/:handle/posts', FBAuth, getAuthenticatedUserPosts)
app.post('/posts', FBAuth, addAPost )


//signup route
app.post('/signup', signUp);
app.post('/login', login )
app.get('/user', FBAuth, getAuthenticatedUser)
app.post('/user', FBAuth, addAFriend)

exports.api = functions.https.onRequest(app)

