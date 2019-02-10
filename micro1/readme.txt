an app created to learn and practice working with microservices:
using external api(timezoneapi.io) to fetch time and natural language processing external service((api.wit.ai)) to process to question from slack I made a bot for slack which returns time in asked location
micro1-time is an extra service returning time alone to the main service located in micro1
it works as following:
client ask in the chat group about the time in certain city, 
1. the message is send to my microservice(micro1)
2. micro1 sends it to NLP engine 
3. NLP engine returns json file with information i need 
4. micro1 sends it to smaller time service (micro1-time)
5. micro1-time sends request to time api process the data returns it to micro1
6. micro1 sends message back to slack chat