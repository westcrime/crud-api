const { v4: uuidv4 } = require('uuid');

class UserService {

    constructor() {
        this.Users = [];
    }

    createUser = function (username, age, hobbies) {
        if (username === undefined || age === undefined || hobbies === undefined) {
            return {data: 'Ooops! Error: No required data!', statusCode: 400};
        }
        if (username.length === 0 || age <= 0) {
            return {data: 'Ooops! Error', statusCode: 400};
        }
        else {
            const user = {
                id: uuidv4(),
                username: username, 
                age: age,
                hobbies: hobbies
            };
            this.Users.push(user);
            return {data: user, statusCode: 201};
        }
    }

    isValidUUID = function (uuid) {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(uuid);
    }

    getUsers = function() {
        return this.Users;
    }

    getUser = function(id) { 
        if (!this.isValidUUID(id)) {
            return {data: 'Ooops! Error: wrong id format!', statusCode: 400};
        }
        for (let i = 0; i < this.Users.length; i++) {
            if (this.Users[i].id === id) {
                return {data: this.Users[i], statusCode: 200};
            }
        }
        return {data: 'Ooops! Error', statusCode: 404};
    }

    updateUser = function(id, username, age, hobbies) {
        if (!this.isValidUUID(id)) {
            return {data: 'Ooops! Error: wrong id format!', statusCode: 400};
        }
        if (username === undefined || age === undefined || hobbies === undefined) {
            return {data: 'Ooops! Error: No required data!', statusCode: 400};
        }
        if (username.length === 0 || age <= 0) {
            return {data: 'Ooops! Error', statusCode: 400};
        }
        for (const user of this.Users) {
            if (user.id === id) {
                user.username = username;
                user.age = age;
                user.hobbies = hobbies;
                return {data: user, statusCode: 200};
            }
        }
        return {data: 'Ooops! Error: No such user!', statusCode: 404};
    }
    
    deleteUser = function(id) {
        if (!this.isValidUUID(id)) {
            return {data: 'Ooops! Error: Wrong id format!', statusCode: 400};
        }
        for (let i = 0; i < this.Users.length; i++) {
            if (this.Users[i].id === id) {
                this.Users.splice(i, 1);
                return {data: this.Users[i], statusCode: 204};
            }
        }
        return {data: 'Ooops! Error: No such user!', statusCode: 404};
    }
}

module.exports = UserService;