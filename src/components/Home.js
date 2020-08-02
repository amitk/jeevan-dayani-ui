import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css'

export default class Home extends Component {
  render() {
  	return(
      <div className="center-card">
        <Card className="text-center login-card" border="primary">
          <Card.Body style={{ marginTop: `90px` }}>
            <Card.Title>Jeevan Dayani</Card.Title>
            <Card.Link href="/pharma_companies"><Button>Visit Application</Button></Card.Link>
          </Card.Body>
        </Card>
      </div>            
    )
  }
}
