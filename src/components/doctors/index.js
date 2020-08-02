import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

export default class Doctors extends Component {
  state = {
    doctors: [],
  }

  componentDidMount() {
    ApiRequest('doctor', 'get', null, null, null).then(response => {
      this.setState({ doctors: response.data.data })
      console.log(response, "doctors");
    }).catch(err => {
      console.log(`Unable to fetch doctors due to: ${err}`);
    })
  }

  removeRow = (id) => {
    this.setState({ doctors: this.state.doctors.filter(clinic => clinic.id !== id)})
  }

  deleteRecord = (rowId) => {
    ApiRequest('doctor', 'delete', rowId, null, null).then(response => {
      console.log('doctor destroyed successfully')
      this.removeRow(rowId)
    })
  }

  delete = (url, row) => {
    return <button className="btn btn-danger" onClick={() => this.deleteRecord(row.id)}>Delete</button>
	}
	
	edit = (url, row) => {
		return <Link to={`/doctors/${row.id}/edit`}><button className="btn btn-primary">Edit</button></Link>
	}

  render() {
    const { doctors } = this.state;

    const columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'specialization',
      text: 'Specialization',
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
            Doctors
            <Link id="newClinic" to={`doctors/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
			<Card.Body>
        <BootstrapTable
            keyField="id"
            data={doctors}
            columns={columns}
        />
			</Card.Body>
        </Card>
      </Container>
    )
  }
}