'use strict';

const RTMClient = require("@slack/client").RTMClient;
const CLIENT_EVENTS = require("@slack/client").CLIENT_EVENTS;
let rtm = null;
let nlp = null;
function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected`);
        
};


function handleOnMessage(message) {

    if(message.text.toLowerCase().includes('megumi')){
        nlp.ask(message.text, (err,res)=>{
             if (err) {
                console.log(err);
                 return;
            }
            try {
                if(!res.intent || !res.intent[0] || !res.intent[0].value){
                throw new Error("Could not extract intent");
                }
                const intent = require('./intents/'+res.intent[0].value + "Intent");
                intent.process(res,function(error, response){
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    return rtm.sendMessage(response, message.channel);
                })
            } catch (err) {
                console.log(err);
                console.log(res);
                rtm.sendMessage("話わからん", message.channel);
            }

            // if(!res.intent){
            //     return rtm.sendMessage("話わからん",message.channel);
    
            // }else if(res.intent[0].value == 'time' && res.location){
            //     return rtm.sendMessage(`I dont know yet time in ${res.location[0].value}`,message.channel);
    
            // }else{
            //     console.log(res);
            //     return rtm.sendMessage("話わからん",message.channel);
    
            // }
    
            // rtm.sendMessage("理解できない",message.channel);
        });
        
    }
    
    
}
function addAuthenticatedHandler(rtm,handler) {
    rtm.on("authenticated", handler);
}
module.exports.init = function slackClient(token, logLevel, nlpClient){
    rtm = new RTMClient(token, {logLevel: logLevel});
    nlp = nlpClient;
    addAuthenticatedHandler(rtm,handleOnAuthenticated)
    rtm.on("message",handleOnMessage)
    return rtm;
};
module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
