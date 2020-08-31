const { db } = require('../util/admin')
const { admin } = require('../util/admin')


exports.getAllScreams = (request, response) => {
    db
     .collection('screams')
     .get()
     .then(data => {
         let screams = []
         data.forEach(doc => {
           console.log('HERE', doc.data())
           screams.push(doc.data())
         }) 
         return response.json(screams)
     })
     .catch((err) => console.log(err))
   }

   exports.addAScream = (request, response) => {
    const newScream = {
     body: request.body.body,
     userHandle: request.user.handle,
     createdAt: admin.firestore.Timestamp.fromDate(new Date())
   };
  db
   .collection('screams')
   .add(newScream)
   .then(doc => {
     response.json({message: `document ${doc.id} created`})
   })
   .catch((err)=>{
     response.status(500).json({error: 'somthing went wrong'})
     console.error(err);
   })
  }