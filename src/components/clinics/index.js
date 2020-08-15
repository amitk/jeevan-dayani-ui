import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Loading from '../Loading.js';

export default class Clinics extends Component {
  state = {
    clinics: [],
    loading: true,
  }

  componentDidMount() {
    ApiRequest('clinic', 'get', null, null, null).then(response => {
      this.setState({ clinics: response.data.data, loading: false })
      console.log(response, "clinics");
    }).catch(err => {
      console.log(`Unable to fetch clinics due to: ${err}`);
    })
  }

  removeRow = (id) => {
    this.setState({ clinics: this.state.clinics.filter(clinic => clinic.id !== id)})
  }

  deleteRecord = (rowId) => {
    ApiRequest('clinic', 'delete', rowId, null, null).then(response => {
      console.log('clinic destroyed successfully')
      this.removeRow(rowId)
    })
  }

  delete = (url, row) => {
    return <button className="btn btn-danger" onClick={() => this.deleteRecord(row.id)}>Delete</button>
  }

  edit = (url, row) => {
    return <Link to={`/clinics/${row.id}/edit`} className="btn btn-primary">Edit</Link>
  }

  render() {
    const { clinics, loading } = this.state;

    const columns = [
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'city',
      text: 'City'
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

  if(loading){
    return <Loading />
  }

    return (
      <Container>
        <Card>
          <Card.Header>
            Clinics
            <Link id="newClinic" to={`clinics/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
					<Card.Body>
            <BootstrapTable
              keyField="id"
              data={clinics}
              columns={columns}
            />
					</Card.Body>
        </Card>
      </Container>
    )
  }
}