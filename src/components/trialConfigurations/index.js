import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

export default class TrialConfigurations extends Component {
  state = {
    trialConfigurations: [],
  }

  componentDidMount() {
    ApiRequest('trial_configuration', 'get', null, null, null).then(response => {
      this.setState({ trialConfigurations: response.data.data })
      console.log(response, "trialConfigurations");
    }).catch(err => {
      console.log(`Unable to fetch trialConfigurations due to: ${err}`);
    })
  }

  removeRow = (id) => {
    this.setState({ trialConfigurations: this.state.trialConfigurations.filter(clinic => clinic.id !== id)})
  }

  deleteRecord = (rowId) => {
    ApiRequest('trial_configuration', 'delete', rowId, null, null).then(response => {
      console.log('trial_configuration destroyed successfully')
      this.removeRow(rowId)
    })
  }

  delete = (url, row) => {
    return <button className="btn btn-danger" onClick={() => this.deleteRecord(row.id)}>Delete</button>
	}
	
	edit = (url, row) => {
		return <Link to={`/trial_configurations/${row.id}/edit`}><button className="btn btn-primary">Edit</button></Link>
	}

  render() {
    const { trialConfigurations } = this.state;

    const columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'drug.name',
      text: 'Drug',
    },
    {
      dataField: 'doctor.name',
      text: 'Doctor',
    },
    {
      dataField: 'clinic.name',
      text: 'Clinic',
    },        
    {
			dataField: 'action',
			text: 'Edit',
			formatter: this.edit,
    },
    {
      dataField: 'action',
      text: 'Delete',
      formatter: this.delete
    }
  ]

    return (
      <Container>
        <Card>
          <Card.Header>
            Trial Configurations
            <Link id="newTrialConfiguration" to={`trial_configurations/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
			<Card.Body>
        <BootstrapTable
            keyField="id"
            data={trialConfigurations}
            columns={columns}
        />
			</Card.Body>
        </Card>
      </Container>
    )
  }
}