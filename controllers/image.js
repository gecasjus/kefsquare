const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'b56836846e204991a011f50d4f82a030'
});

const handleApiCall = (req, res) => {
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => {
  res.json(data);
})
.catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id) //update the id that we received in the body
  	.increment('entries', 1)   //increment entries by 1
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]); //to return a first array
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
  	handleImage,
    handleApiCall
  };