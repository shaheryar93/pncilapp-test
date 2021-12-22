const mongoose = require('mongoose'); 
const question = mongoose.model('question');

function addQuestion(body) {
	return new Promise((resolve, reject) => {
		question.create(body)
			.then(questionAdded => {
				resolve(questionAdded);
			})
			.catch(error => {
				reject(error);
			});
	});
}


module.exports = {
    addQuestion
};