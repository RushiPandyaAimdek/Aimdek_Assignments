import express from 'express';
import * as fs from 'fs';

const router = express.Router();
var users = [];

// reading data
fs.readFile("user.json", "utf8", (err, data) => {
    if (err) {
        res.send(err);
        return;
    }
    else users = JSON.parse(data);
});

// get all users
router.get('/', (req, res) => {
    res.send(users);
})

// get user by id
router.get('/:id', (req, res) => {
    const foundUser = users.find((user) => user.id == req.params.id);
    res.send(foundUser);
})

// insert a new user
router.post('/', (req, res) => {

    users.push(req.body);
    fs.writeFile("user.json", JSON.stringify(users), 'utf8', function (err) {
        if (err) {
            res.send(err);
            return;
        }
        else res.send(`User with ID ${req.body.id} added succesfully`);
    });
})

// delete a user by id
router.delete('/:id', (req, res) => {
    users = users.filter((user) => user.id != req.params.id);
    fs.writeFile("user.json", JSON.stringify(users), function (err) {
        if (err) {
            res.send(err);
            return;
        }
    });
    res.send(`Data deleted succesfully from ID ${req.params.id}`);
});

// update a user by id
router.put('/:id', (req, res) => {

    var foundUser = users.find(user => user.id === parseInt(req.params.id));

    foundUser.name = req.body.name;
    foundUser.password = req.body.password;
    foundUser.gender = req.body.gender;
    foundUser.birthdate = req.body.birthdate;
    foundUser.age = req.body.age;
    foundUser.country = req.body.country;
    foundUser.phone = req.body.phone;

    const newState = users.map(obj =>
        obj.id === req.params.id ? { ...obj, foundUser } : obj
    );

    fs.writeFile("user.json", JSON.stringify(newState), 'utf8', (err) => {
        if (err) {
            res.send(err);
            return;
        }
        else res.send(`User with ID ${req.params.id} updated succesfully`);
    });
});
export default router;