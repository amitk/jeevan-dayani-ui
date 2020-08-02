import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavigationBar extends Component {
	render() {
		return (
			<Navbar bg='dark' expand="lg" variant="dark">
				<Navbar.Brand href="/">Jeevan Dayani</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/pharma_companies">Pharma Companies</Nav.Link>
					<Nav.Link href="/doctors">Doctors</Nav.Link>
					<Nav.Link href="/clinics">Clinics</Nav.Link>
					<Nav.Link href="/trial_configurations">TrialConfigurations</Nav.Link>
					<Nav.Link href="/trials">Trials</Nav.Link>
				</Nav>
				</Navbar.Collapse>             
			</Navbar>
		)
	}
}