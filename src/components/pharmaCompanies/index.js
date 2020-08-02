import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import Loading from '../Loading.js';

export default class PharmaCompanies extends Component {
  state = {
    pharmaCompanies: [],
    loading: true
  }

  componentWillMount() {
    ApiRequest('pharma_company', 'get', null, null, null).then(response => {
      this.setState({ pharmaCompanies: response.data.data, loading: false })
    }).catch(err => {
      console.log(`Unable to fetch pharma companies due to: ${err}`);
    })
  }

  editButton = (url, row) => {
    return (
      <Link id={`editPharmaCompanies${row.id}`} to={`pharma_companies/${row.id}/edit`}><button className="btn btn-primary">Edit</button></Link>
    )
  }

  redirectButton = (url, row) => {
    return (
      <Link id={`drugs${row.id}`} to={`pharma_companies/${row.id}/drugs`}><button className="btn btn-primary">Drugs</button></Link>
    )
  }

  deleteRecord = (row) => {
    ApiRequest('pharma_company', 'delete', row.id, null, null).then(response => {
      console.log(response, 'response');
    })
  }

  deleteButton = (url, row) => {
    return <button className="btn btn-danger" onClick={() => {this.deleteRecord(row)}}>Delete</button>
  }
  
  render() {
    const { pharmaCompanies, loading } =  this.state;
    const columns = [
    {
      dataField: 'name',
      text: "Name",
    },
    {
      dataField: 'action',
      text: "Edit",
      formatter: this.editButton,
    },
    {
      dataField: 'action',
      text: "Drugs",
      formatter: this.redirectButton,
    }]

    if(loading) {
      return <Loading />
    }
    return (
      <Container>
        <Card>
          <Card.Header>
            Pharma Companies
            <Link id="newPharmaCompany" to={`pharma_companies/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
					<Card.Body>
            <BootstrapTable
              keyField="id"
              data={pharmaCompanies}
              columns={columns}
            />
					</Card.Body>
        </Card>
      </Container>
    )
  }
}