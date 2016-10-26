# unificationengine-client [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A UnificationEngine client SDK for NodeJS

### Here's how simple it is to post a message on your wall and a Facebook page, in a single call:
```js
connection.sendMessage({
    "receivers":[
        {"name":"me"},
        {"name":"Page", "id":"122"}
    ],
    "message":{"body": "Hello World!"}
});
```

## Installation

```sh
$ npm install --save ue-node-sdk
```

## Usage

```js
var UEClient = require('ue-node-sdk');

var app = new UEClient("APP_KEY","APP_SECRET");
```

#### Creating User
```js
app.createUser()
.then(function(user){
   //user is a User object
})
.catch(function(err){
   //Handle error
});
```

#### Listing Users
```js
app.listUsers()
.then(function(users){
   //users is an array of User objects
})
.catch(function(err){
   //Handle error
});
```

#### Deleting User
```js
app.deleteUser(user)
.then(function(){
	//user deleted succesfully
})
.catch(function(err){
   //Handle error
});
```

#### Adding a connection to a user
```js
user.addConnection(connectionName, service, serviceAccessToken, optionalParams)
.then(function(connection){
	//connection is a Connection object
})
.catch(function(err){
   //Handle error
});
```

- `connectionName` must be unique per connection.
- `serviceAccessToken` has to be valid and working from the provider side
- `optionalParams` an object with key:value pair


#### Listing User connections
```js
user.listConnections()
.then(function(connections){
	//connections is an array of Connection objects
})
.catch(function(err){
   //Handle error
});
```
#### Removing a User Connection
```js
user.removeConnection(connectionName)
.then(function(){
	//connection removed successfully
})
.catch(function(err){
   //Handle error
});
```

#### Testing a connection
```js
user.testConnection(serviceUrl) //eg: facebook://accesstoken@facebook.com
.then(function(){
	//serviceUrl is valid and can be added as a conncetion
})
.catch(function(err){
   //Handle error
});
```

### Sending a message using a connection
```js
connection.sendMessage({
  "receivers":[
    {
    	"name":"me"
    },
    {
    	"name":"Page",
    	"id":"122"
    }
  ],
  "message":{
    "subject":"test",
    "body": "ABC",            
    "image":"http://imageUrl",
    "link":{
      "uri": "http://google.com",
      "description": "link desc",
      "title":"link title"
    }
  }
})
.then(function(uris){
	console.log(uris); //URIs of the sent messages
})
.catch(function(err){
	//handle error
});

```








[npm-image]: https://badge.fury.io/js/unificationengine-client.svg
[npm-url]: https://npmjs.org/package/unificationengine-client
[travis-image]: https://travis-ci.org/daedlock/unificationengine-client.svg?branch=master
[travis-url]: https://travis-ci.org/daedlock/unificationengine-client
[daviddm-image]: https://david-dm.org/daedlock/unificationengine-client.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/daedlock/unificationengine-client
