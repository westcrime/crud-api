const http = require("http");
const UserService = require("./UserService");
require('dotenv').config();
 
const userService = new UserService();
const port = process.env.PORT || 4000;
//userService.createUser('Dima', 20, ['Programming', 'Videogames']);
const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        if (request.url === '/api/users') {
            handleGetUsersRequest(request, response);
        } else if (/^\/api\/users\/.+$/.test(request.url)) {
            handleGetUserRequest(request, response);
        }
    } else if (request.method === 'POST' && request.url === '/api/users') {
        handleCreateUserRequest(request, response);
    } else if (request.method === 'PUT' && /^\/api\/users\/.+$/.test(request.url)) {
        handleUpdateUserRequest(request, response);
    } else if (request.method === 'DELETE' && /^\/api\/users\/.+$/.test(request.url)) {
        handleDeleteUserRequest(request, response);
    } else {
        request.statusCode = 404;
        request.end('Oops! Wrong address');
    }
});

function handleGetUsersRequest(request, response) {
    response.statusCode = 200;
    response.end(JSON.stringify(userService.getUsers()));
}

function handleGetUserRequest(request, response) {
    const userId = request.url.split('/').pop();
    const answer = userService.getUser(userId); 
    response.statusCode = answer.statusCode;
    response.end(JSON.stringify(answer.data));
}

function handleCreateUserRequest(request, response) {
    let data = '';

    request.on('data', chunk => {
        data += chunk.toString();
    });

    request.on('end', () => {
        console.log(data);
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        const answer = userService.createUser(jsonData.username, jsonData.age, jsonData.hobbies);
        console.log(answer);
        response.statusCode = answer.statusCode;
        response.end(JSON.stringify(answer.data)); 
    });
}

function handleUpdateUserRequest(request, response) {
    const userId = request.url.split('/').pop();
    let data = '';

    request.on('data', chunk => {
        data += chunk.toString();
    });

    request.on('end', () => {
        console.log(data);
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        const answer = userService.updateUser(userId, jsonData.username, jsonData.age, jsonData.hobbies);
        console.log(answer);
        response.statusCode = answer.statusCode;
        response.end(JSON.stringify(answer.data)); 
    });
}

function handleDeleteUserRequest(request, response) {
    const userId = request.url.split('/').pop();
    const answer = userService.deleteUser(userId);
    console.log(answer);
    response.statusCode = answer.statusCode;
    response.end(JSON.stringify(answer.data)); 
}

server.listen(port, function(){ console.log("Server is now working on http://localhost: " + port)});