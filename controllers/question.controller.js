const questionHelper = require('../helpers/question.helper');


const addQuestion = (req, res) => {
  
	questionHelper
		.addQuestion(req.body)
		.then(resp => {
			res.status(200).send({ data: resp });
		})
		.catch(err => {
			res.status(500).send(err);
		});
};




module.exports = {
	addQuestion
};

