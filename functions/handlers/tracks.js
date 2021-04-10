const { db } = require('../util/admin')
const { admin } = require('../util/admin')



exports.getMyTracks = (request, response) =>{
    db
    .collection('userTracks')
    .where('handle', '==', request.params.handle)
    .get()
    .then(data => {

     if(request.params.handle !== request.user.handle){
       return response.status(501).json({error: 'Unauthorized Request'})
     }
        let trackData = []
        data.forEach(doc => {
          trackData.push(doc.data())
        }) 
        return response.json(trackData)
    })
    .catch((err) => console.log(err))
}

// exports.getAllPosts = (request, response) => {
//     db
//      .collection('posts')
//      .orderBy('createdAt')
//      .get()
//      .then(data => {
//          let posts = []
//          data.forEach(doc => {
//            posts.push(doc.data())
//          }) 
//          return response.json(posts)
//      })
//      .catch((err) => console.log(err))
//    }

//    exports.getAuthenticatedUserPosts = (request, response) => {
//     db
//      .collection('posts')
//      .where('handle', '==', request.params.handle)
//      .orderBy('createdAt')
//      .get()
//      .then(data => {

//       if(request.params.handle !== request.user.handle){
//         return response.status(501).json({error: 'Unauthorized Request'})
//       }
//          let posts = []
//          data.forEach(doc => {
//            posts.push(doc.data())
//          }) 
//          return response.json(posts)
//      })
//      .catch((err) => console.log(err))
//    }

//    exports.addAPost = (request, response) => {
//     const newScream = {
//      body: request.body.body,
//      handle: request.user.handle,
//      createdAt: new Date().toISOString()

//    };

//   db
//    .collection('posts')
//    .add(newScream)
//    .then(doc => {
//      response.json({message: `document ${doc.id} created`})
//    })
//    .catch((err)=>{
//      response.status(500).json({error: 'something went wrong'})
//      console.error(err);
//    })
//   }