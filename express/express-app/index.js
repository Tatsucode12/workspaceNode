import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// app.use(express.json());

app.use('/images', express.static('images'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.urlencoded({extended: true}));

app.set('trust proxy','loopback');

app.get('/',(req,res)=>
        res.json(data)
);

app.post('/newItem',(req,res)=>{
        console.log(req.body);
        res.send(req.body);
});

app.get('/item/:id',(req, res, next)=>{

        console.log(req.params.id);
        let user = Number(req.params.id);
        console.log(user);
        console.log(data[user]);
        console.log(`request from: ${req.originalUrl}`);
        console.log(`request type: ${req.method}`);
        res.send(data[user]);
        next();
},(req,res) =>
        console.log('did you get the right data?')
);


app.route('/item')
        .get((req,res)=>{
                //throw new Error();
                //res.download('images/rocket.jpg')
                //res.redirect('http://linkedin.com')
                //res.end()
                res.send(`a get request with /item route on port ${PORT}`)
        })
        .put((req,res)=>
                res.send(`a put request with /item route on port ${PORT}`)
        )
        .delete((req,res)=>
                res.send(`a delete request with /item route on port ${PORT}`)
        );

app.use((err, req, res, next)=>{
        console.error(err.stack);
        res.status(500).send(`Red alert! Red Alert!: ${err.stack}`);
});

app.listen(PORT, ()=>{
        console.log(`Your server is running on port ${PORT}`);
        //console.log(data);
});
