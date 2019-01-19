import React, { Component } from 'react';
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
import './registration.css';
 
var htmlInput = '<div><h1>Title</h1><p>A paragraph</p></div>';
var htmlToReactParser = new HtmlToReactParser();
var reactElement = htmlToReactParser.parse(htmlInput);
// var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);

class registration extends Component {
    state = {  }
    render() { 
        return ( reactElement );
    }
}
 
export default registration;