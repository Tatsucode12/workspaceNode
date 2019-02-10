'use strict';

const express = require("express");
const service = express();
const request = require("request");


service.get("/service/:location",(req,res,next)=>{
    // res.json({result : req.params.location});
        const token = '';
        request("https://timezoneapi.io/api/timezone/?Europe/"+req.params.location+"&token="+token, function(err, response, dat){

            // Parse
            var data = JSON.parse(dat);
        
            // Request OK?
            if(data.meta.code == '200'){
               
                // Example: Get the users time
                var time = data.data.datetime.date_time_txt;
                res.json({result : time})
            }
        
        });
        
});

module.exports = service;