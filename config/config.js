let environmentVariaBles = {
    development: {
        runningPort: 3001,
        mongoUrl: 'mongodb://localhost:27017/',
        host: 'localhost',
        port: '27017',
        serverUrl: 'http://localhost:3001/',
        mongoDbName: 'QuestionsAndTopics',
        localDBConnectionString: "mongodb+srv://digisol:digisol@cluster0.oudlk.mongodb.net/QuestionsAndTopics",
        liveConnectionString: "mongodb+srv://digisol:digisol@cluster0.oudlk.mongodb.net/QuestionsAndTopics"
    },
    staging: {
        runningPort: 3001,
        mongoUrl: 'mongodb://localhost:27017/',
        host: 'localhost',
        port: '27017',
        serverUrl: 'http://localhost:3001/',
        mongoDbName: 'QuestionsAndTopics',
        localDBConnectionString: "mongodb+srv://digisol:digisol@cluster0.oudlk.mongodb.net/QuestionsAndTopics",
        liveConnectionString: "mongodb+srv://digisol:digisol@cluster0.oudlk.mongodb.net/QuestionsAndTopics"
    },
};

let runningEnviornent = process.argv[2];
let environments = ['development', 'staging', 'production'];
if (environments.includes(runningEnviornent) <= 0) {
    throw new Error(`Please select from the following: ${environments}`);
}

module.exports = {
    port: environmentVariaBles[runningEnviornent].runningPort,
    dbName: environmentVariaBles[runningEnviornent].mongoDbName,
    dbUrl: environmentVariaBles[runningEnviornent].mongoUrl,
    localDB: environmentVariaBles[runningEnviornent].localDBConnectionString,
    liveDB: environmentVariaBles[runningEnviornent].liveConnectionString,
    host: environmentVariaBles[runningEnviornent].host,
    serverUrl: environmentVariaBles[runningEnviornent].serverUrl
};