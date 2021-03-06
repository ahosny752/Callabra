const { db } = require('../util/admin');
db.settings({ ignoreUndefinedProperties: true })

const firebase = require('firebase');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const config = require('../util/config');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validators');

exports.signUp = (request, response) => {
    const newUser = {
      email: request.body.email,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
      handle: request.body.handle,
    }
  const {valid, errors} = validateSignupData (newUser)
  
  if(!valid) {return response.status(400).json(errors)}

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
    .then((doc) =>{
      if(doc.exists) {
        return response.status(400).json({ handle: 'This handle is already taken'})
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then((data) => {
      userId = data.user.uid;
  return data.user.getIdToken()
    })
    .then((idToken) => {
      token = idToken
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          friends: [request.body.friends],
          avatarUrl: '',
          firstName: '',
          lastName: '',
          instrument: [
            {name: 'Guitar', canPlay: false},
            {name: 'Bass', canPlay: false},
            {name: 'Drums', canPlay: false},
            {name: 'Piano', canPlay: false},
          ],
          genre: [
            {name: 'R&B', canPlay: false},
            {name: 'Jazz', canPlay: false},
            {name: 'Blues', canPlay: false},
            {name: 'Rock', canPlay: false},
          ],
          userId
        };
  
  return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() =>{
      return response.status(200).json({ token })
    })
    .catch((err) => {
      console.error(err)
      if (err.code === 'auth/weak-password'){
        return response.status(501).json({ password: "Password must be at least 6 characters"})
      } else if (err.code === 'auth/email-already-in-use'){
        return response.status(501).json({ email: 'Email is already associated with an account. Please Log in'})
       } else {
        return response.status(500).json({error: err.code})
      }
    })
  }


  exports.login = (request, response) => {
    const user = {
      email: request.body.email,
      password: request.body.password,
      };

    const {valid, errors} = validateLoginData (user)
    if(!valid) {return response.status(400).json(errors)}

      let idToken;
      if(Object.keys(errors).length > 0){
        return response.status(400).json({errors})
      }
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((data) =>{
        return data.user.getIdToken()
      })
      .then((token) => {
        idToken = token
        return db.collection("users").where("email", "==", request.body.email).get()
      })
        .then((data) => {
          data.forEach((doc) =>{
           handle = doc.data().handle
          })
          return response.json({token: idToken, handle})
        })
      .catch((err) =>{
        console.error(err)
        if(err.code === "auth/wrong-password"){
          return response.status(500).json({password: 'Wrong password, please try again'})
        } 
        if(err.code === "auth/user-not-found"){
          return response.status(500).json({email: 'This email address is not associated with an account.'})
        } else {
          return response.status(500).json({error: err.code})
        }
      })
  }

  exports.getAuthenticatedUser = (request, response) => {
    if(request.body.handle === ''){ 
      return response.status(500).json({error: 'Must submit a handle'})
    } 
    const authenticatedUserData = {}
    db.doc(`/users/${request.user.handle}`).get()
    .then((doc) => {
    if(doc.exists){
      authenticatedUserData.profile = doc.data()
      return response.status(200).json(authenticatedUserData)
  } else {
    return response.status(501).json({error: 'This handle does not exist'})
  }
  })
 
    .catch((error) => {
    console.error("Error writing document: ", error);
    return response.status(200).json({error: 'something went wrong'})
});

  }

  
  exports.addAUser = (request, response) => {
    db.doc(`/users/${request.body.handle}`).get()
    .then((doc) => {
      if(doc.id === request.user.handle){
        return response.status(200).json({message: `You cannot add yourself`})
      } else if (!doc.exists){
        return response.status(400).json({ handle: 'This handle does not  exist'})

      } else if (doc.exists){

     
//check if friend was already added
       db .collection("friends")
        .where("addedBy", "==", request.user.handle)
        .where("addedUser", "==", request.body.handle)
        .get()

        .then((data)=>{
        let currentFriendsWithThisHandle = []
        data.forEach((doc) =>{
          currentFriendsWithThisHandle.push(doc.data())
          return currentFriendsWithThisHandle;
        })
        
        console.log('current friends', currentFriendsWithThisHandle)
const isAfriend = (currentFriendsWithThisHandle.length > 0  ? true: false)

if(isAfriend){ // if friend already is in friends list
  return response.status(400).json({ general: 'You have already added this friend'})
}
if(!isAfriend){ //if not added in friends list
     const addUserCredentials = {
          addedAt: request.body.addedAt,
          addedBy: request.user.handle,
          addedUser: request.body.handle,
        }

        db
        .collection('friends')
        .add(addUserCredentials)

        db.doc(`/users/${request.user.handle}`).update({
          friends: FieldValue.arrayUnion({handle: request.body.handle})
        })
           return response.status(501).json({ general: `${request.body.handle} added succesfully`})

            }   
        })
      }
    })
 
    .catch((error) => {
    console.error("Error writing document: ", error);
    return response.status(200).json({error: 'something went wrong'})
});

  }
