import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Loading from '../Loading.js';

export default class Trials extends Component {
  state = {
    trials: [],
    loading: true,
  }

  componentWillMount() {
    ApiRequest('trial', 'get', null, null, null).then(response => {
      this.setState({ trials: response.data.data, loading: false })
    }).catch(err => {
      console.log(`Unable to fetch trials due to: ${err}`);
    })
  }

  editButton = (url, row) => {
    return (
      <Link id={`editTrial${row.id}`} to={`trials/${row.id}/edit`}><button className="btn btn-primary">Edit</button></Link>
    )
  }

  redirectButton = (url, row) => {
    return (
      <Link id={`patients${row.id}`} to={`trials/${row.id}/patients`}><button className="btn btn-primary">Patients</button></Link>
    )
  }

  returnPhaseLabel = (phase) => {
    switch(phase.toString()) {
      case "1":
        return "Phase I";
      case "2":
        return "Phase II";
      case "3":
        return "Phase III";
      case "4":
        return "Phase IV";
    }
  }

  phaseFormatter = (url, row) => {
    return this.returnPhaseLabel(row.phase);
  }

  editFormatter = (url, row) => {
    return <Link to={`/trials/${row.id}/edit`} className="btn btn-primary">Edit</Link>
  }

  render() {
    const { trials, loading } =  this.state;
    
    const columns = [
    {
      dataField: 'name',
      text: "Name",
    },
    {
      dataField: 'phase',
      text: "Phase",
      formatter: this.phaseFormatter,
    },
    {
      dataField: 'trial_configuration.name',
      text: 'Trial Configuration'
    },
    {
      dataField: 'action',
      text: 'Edit',
      formatter: this.editFormatter,
    },
    {
      dataField: 'action',
      text: "patients",
      formatter: this.redirectButton,
    }]

    if(loading) {
      return <Loading />
    }

    return (
      <Container>
        <Card>
          <Card.Header>
            Trials
            <Link id="newTrial" to={`trials/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
					<Card.Body>
            <BootstrapTable
              keyField="id"
              data={trials}
              columns={columns}
            />
					</Card.Body>
        </Card>
      </Container>
    )
  }
}