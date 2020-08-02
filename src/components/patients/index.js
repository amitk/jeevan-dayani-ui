import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';


export default class Drugs extends Component {
  
  state = {
    patients: [],
    trial: {},
  }


  componentWillMount() {
    let trialId = this.props.match.params.trial_id
    if (trialId) {
      ApiRequest('patient', 'get', null, null, {resource: 'trial', id: trialId}).then(response => {
        this.setState({ patients: response.data.data })
      }).catch(err => {
        console.log(`Unable to fetch patients due to: ${err}`);
      })
  
      //get trial
      ApiRequest('trial', 'get', trialId, null, null).then(response => {
        this.setState({ trial: response.data.data.trial })
      })
    }
  }

  editButton = (url, row) => {
    const trialId = row.trial_id
    return (
      <Link id={`editDrugs${row.id}`} to={`/trials/${trialId}/patients/${row.id}/edit`}><button className="btn btn-primary">Edit</button></Link>
    )
  }

  removeDrug = (id) => {
    this.setState({ patients: this.state.patients.filter(patient => patient.id !== id) });
  }

  makeRequest = (row) => {
    ApiRequest('patient', 'delete', row.id, null, { resource: 'trial', id: row.trial_id }).then(response => {
      this.removeDrug(row.id)
    })
  }

  deleteDrug = (url, row) => {
    return <button id={`delete_patient${row.id}`} className="btn btn-danger" onClick={() => this.makeRequest(row)}>Delete</button>
  }

  render() {
    const { patients, trial } = this.state;

    const columns = [
      {
        dataField: 'name',
        text: "Name",
      },
      {
        dataField: 'age',
        text: 'Age',
      },
      {
        dataField: 'sex',
        text: 'Sex',
      },
      {
        dataField: 'feedback.state',
        text: 'Feedback',
      },
      {
        dataField: 'action',
        text: "Edit",
        formatter: this.editButton,
      },
      {
        dataField: 'action',
        text: "Delete",
        formatter: this.deleteDrug,
      }
    ]
  
    return (
      <Container>
        <Card>
          <Card.Header>
            {`Patients(${trial.name})`}
            <Link id="newDrug" to={`/trials/${trial.id}/patients/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
					<Card.Body>
            <BootstrapTable
              keyField="id"
              data={patients}
              columns={columns}
            />
					</Card.Body>
        </Card>
      </Container>
     )
  }
}