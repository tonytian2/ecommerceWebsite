import axios from 'axios';
var rootURL = require("./rootURL")

export default axios.create({
    baseURL: `${rootURL.BaseURL}/shoppingcart`
});