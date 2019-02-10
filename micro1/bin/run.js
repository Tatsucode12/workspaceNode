'use strict';

const slackClient = require("../server/slackClient");
const service = require("../server/service");
const http = require("http");
const server = http.createServer(service);

const witToken = "";
const witClient = require("../server/witClient")(witToken);

const slackToken = "";
const slackLogLevel = "debug";

const rtm = slackClient.init(slackToken, slackLogLevel,witClient);
rtm.start();
// server.listen(3000);
slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));
server.on("listening", function () {
    console.log(`service is  listening on ${server.address().port} in ${service.get("env")} mode.`)
});



  
  