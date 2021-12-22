const req = require('express/lib/request');
const mongoose = require('mongoose'); 
const topic = mongoose.model('topic');
const question = mongoose.model('question');
function addTopic(body) {
	return new Promise((resolve, reject) => {
		topic.create(body)
			.then(topicCreated => {
				resolve(topicCreated);
			})
			.catch(error => {
				reject(error);
			});
	});
}

function getTopic(query) {
	let skip = 0;
	let limit = 10;
	if (query.skip) {
		skip = Number(query.skip);
	}
	if (query.limit) {
		limit = Number(query.limit);
	}

	return new Promise((resolve, reject) => {
		const searchQuery = {};
		if(query.topicName) {
			searchQuery['$or'] =[];
			searchQuery['$or'].push({
				topicName:query.topicName
			  })
			  searchQuery['$or'].push({ 
				'parent.topicName':query.topicName
			  })

		}
		
		topic
			.aggregate([ {$unwind: {
				path: '$options', 
				preserveNullAndEmptyArrays: true
			  }}, {$lookup: { 
				from: 'topics',
											let: { classIds: '$options' },
											pipeline: [ 
											  {
												$match: {
												  $expr: { $eq: ['$_id', '$$classIds'] },
			  
												}
											  },
											  {
												$project: {
												  "topicName": 1,
												  "parentId": 1,
												  "createdAt":1,
			  
												}
											  }
											],
								  as: 'option'
			  }}, {$lookup: {
				from: 'topics',
											let: { classIds: '$parentId' },
											pipeline: [
											  {
												$match: {
												  $expr: { $eq: ['$_id', '$$classIds'] },
			  
												}
											  },
											  {
												$project: {
												  "topicName": 1,
												  "parentId": 1,
												  "createdAt":1,
			  
												}
											  }
											],
								  as: 'parent'
			  }}, {$unwind: { 
				path: '$parent',
				preserveNullAndEmptyArrays: true
			  }}, {$unwind: {
				path: '$option',
				preserveNullAndEmptyArrays: true 
			  } }, {$match: searchQuery}, {$group: {
				_id: 'null',
				options: {
				  $addToSet: {
					optionName:"$option.topicName"
				  }
				},
				topicNames: {
				  $addToSet: {
					optionName:"$topicName"
				  }
				}
			  }}, {$project: {
			   total:{ $setUnion:['$options','$topicNames']}
			  }}])
			.then(resp => {
				if(resp && resp.length>0 && resp[0]['total'] && resp[0]['total'].length>0) {
					let topics= []
					for(let i=0;i<resp[0]['total'].length;i++) {
						
						topics.push(resp[0]['total'][i].optionName)
				}
				question.aggregate([{
					$match:{
						annotations:{$in:topics}
					}
				},{
					$project:{
						question:"$question"
					}
				}]).then(resp=>{
					resolve(resp );
				}).catch(err=>{
					reject(err)
				})

			
				} else {
					resolve({})
				}
				
			})
			.catch(err => {
				reject(err);
			});
	});
}

module.exports = {
    addTopic,
    getTopic
};