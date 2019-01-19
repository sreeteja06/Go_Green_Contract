import React, { Component } from 'react';

import { Form } from 'semantic-ui-react'
// var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);


class registration extends Component {
    state = {  }
    
    render() { 
        return ( 
            <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Name' placeholder='Name' />
            <Form.Input fluid label='Address' placeholder='Address' />
            <Form.Input fluid label='Phone' placeholder='Phone' />
          </Form.Group>
        </Form>
         );
    }
}
 
export default registration;