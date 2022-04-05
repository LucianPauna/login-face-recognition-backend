import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { handleApiCall, handleImage } from './controllers/image.js';
import { handleDelete } from './controllers/delete.js';

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DATABASE_URL,
        ssl: true
    }
});

const PORT = process.env.PORT ?? 3001;

const app = express();
app.use(express.json());
app.use(cors());

// * --> res = this is working
app.get('/', (req, res) => {
    res.send('It is working!');
});

// * /signin endpoint --> POST = success/fail
app.post('/signin', (req, res) => {
    handleSignIn(req, res, db, bcrypt);
});

// * /register endpoint --> POST
app.post('/register', (req, res) => {
    handleRegister(req, res, db, bcrypt);
});

// * /image endpoint --> PUT
app.put('/image', (req, res) => {
    handleImage(req, res, db);
});

// * /image endpoint --> POST
app.post('/imageurl', (req, res) => {
    handleApiCall(req, res);
});

// * /delete endpoint --> POST
app.post('/delete', (req, res) => {
    handleDelete(req, res, db);
});


app.listen(PORT), ()=> {
    console.log(`App is running on port ${PORT}`);
};