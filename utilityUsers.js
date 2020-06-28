const fs = require('fs');
const path = require('path');

const getUsers = async() => {
    return JSON.parse(
        await fs.promises.readFile(path.join(__dirname, 'data', 'users.json'))
        );
}

const setUsers = async(users) => {
    await fs.promises.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users));
}


module.exports.getUsers = getUsers;
module.exports.setUsers = setUsers;