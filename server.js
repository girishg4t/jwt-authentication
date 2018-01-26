const express = require("express");
const bodyParser = require('body-parser');
const _ = require('lodash');
const { User } = require('./user');
const bcrypt = require('bcryptjs');

var app = express();

const port = process.env.PORT || 7771;

app.use(bodyParser.json());

app.post('/user', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((user) => {

        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.post('/user/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {

        bcrypt.compare(req.body.password, user.password, (err, result) => {

            if (result) {

                res.send(user);
            }
        });
    });

});

app.get('/user', (req, res) => {
    res.send("user test");
});

app.get('/', (req, res) =>
    res.send('Hello World!')
);

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
}); 
