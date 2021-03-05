
const http = require('http');
const fs = require("fs");

let list = [
	{
		"name":"Cook Food",
		"light": false,
		"checked": false
	},
	{
		"name":"Drink Milk",
		"light": false,
		"checked": false
	},
	{
		"name":"Wash Dishes",
		"light": false,
		"checked": false
	},
	{
		"name":"Finish Assignment",
		"light": false,
		"checked": false
	},
	{
		"name":"Read Book",
		"light": false,
		"checked": false
	}
];
//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log(request.url);
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/todo.html"){
			//read the todo.html file and send it back
			fs.readFile("todo.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.write(data);
				response.end();
			});
		}else if(request.url === "/todo.js"){
			//read todo.js file and send it back
			fs.readFile("todo.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.write(data);
				response.end();
			});
		}else if(request.url === "/list"){
			console.log(request.url);
			response.statusCode = 200;
			response.write(JSON.stringify(list));
			response.end();
		}else{
			response.statusCode = 404;
			response.write("Unknwn resource.");
			response.end();
		}
	}else if(request.method === "POST"){
		if(request.url === "/list"){
			body = "";
			request.on("data", (chunk) => {
				body += chunk;
			});
			request.on("end", () => {
				let jsonDATA = JSON.parse(body);
				list.push(jsonDATA);
			});
			response.statusCode = 200;
			response.end();
		} else {
			response.statusCode = 404;
			response.write("Unknown Resource.");
			response.end();
		}
	}else if(request.method === "PUT"){
		//any handling in here
		if(request.url === "/list"){
			let body = "";
			request.on("data", (chunk) => {
				body += chunk;
			});
			request.on("end", () => {
				let eventList = JSON.parse(body);
				list = eventList.item;
			});
		}
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
