const topicHelper = require('../helpers/topic.helper');


const addTopic = (req, res) => {
  
	topicHelper
		.addTopic(req.body)
		.then(resp => {
			res.status(200).send({ data: resp });
		})
		.catch(err => {
			res.status(500).send(err);
		});
};


const getTopics = (req, res) => {
	topicHelper
		.getTopic(req.query)
		.then(resp => {
            console.log('rec')
			res.status(200).send({ data: resp });
		})
		.catch(err => {
			res.status(500).send(err);
		});
};




module.exports = {
	addTopic,
    getTopics
};

