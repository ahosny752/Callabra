const { db } = require('../util/admin');
const firebase = require('firebase');

const config = require('../util/config');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validators')

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
        return response.status(501).json({ email: 'Email is already in use'})
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

      if(Object.keys(errors).length > 0){
        return response.status(400).json({errors})
      }
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((data) =>{
        return data.user.getIdToken()
      })
      .then((token) =>{
        return response.json({token})
      })
      .catch((err) =>{
        console.error(err)
        if(err.code === "auth/wrong-password"){
          return response.status(500).json({general: 'Invalid Credentials'})
        } else {
          return response.status(500).json({error: err.code})
        }
      })
  }