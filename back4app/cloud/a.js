//const Parse = require('parse/node');
const Parse = require('parse');

// Initialize with your Back4app keys
Parse.initialize("pYw5wXVulq0ePzDuYgAeZ2piVO8eUspQonWG0oWD", "16bOXVPueG4gODISdG4lJz5jB2L0TKLuPWDC4rry");  // Replace with your App ID and JS Key
Parse.serverURL = 'https://parseapi.back4app.com';
let query = new Parse.Query("Msg");
console.log(query)