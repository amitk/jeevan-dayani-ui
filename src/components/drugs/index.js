import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card,  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Loading from '../Loading.js';

export default class Drugs extends Component {
  
  state = {
    drugs: [],
    pharma_company: {},
    loading: true
  }


  componentWillMount() {
    let pharma_company_id = this.props.match.params.pharma_company_id
    if (pharma_company_id) {
      ApiRequest('drug', 'get', null, null, {resource: 'pharma_company', id: pharma_company_id}).then(response => {
        this.setState({ drugs: response.data.data, loading: false })
      }).catch(err => {
        console.log(`Unable to fetch drugs due to: ${err}`);
      })
  
      //get pharma company
      ApiRequest('pharma_company', 'get', pharma_company_id, null, null).then(response => {
        this.setState({ pharma_company: response.data.data })
      })
    }
  }

  sideEffectsFormatter = (cell, row) => {
    return cell.join(',')
  }

  editButton = (url, row) => {
    const pharma_company_id = row.pharma_company_id
    return (
      <Link id={`editDrugs${row.id}`} to={`/pharma_companies/${pharma_company_id}/drugs/${row.id}/edit`}><button className="btn btn-primary">Edit</button></Link>
    )
  }

  removeDrug = (id) => {
    this.setState({ drugs: this.state.drugs.filter(drug => drug.id !== id) });
  }

  makeRequest = (row) => {
    ApiRequest('drug', 'delete', row.id, null, { resource: 'pharma_company', id: row.pharma_company_id }).then(response => {
      this.removeDrug(row.id)
    })
  }

  deleteDrug = (url, row) => {
    return <button id={`delete_drug${row.id}`} className="btn btn-danger" onClick={() => this.makeRequest(row)}>Delete</button>
  }

  render() {
    const { drugs, pharma_company, loading } = this.state;

    const columns = [
      {
        dataField: 'name',
        text: "Name",
      },
      {
        dataField: 'target_ailment',
        text: 'Target Ailment',
      },
      {
        dataField: 'side_effects',
        text: 'Side Effects',
        formatter: this.sideEffectsFormatter,
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

    if(loading) {
      return <Loading />
    }
  
    return (
      <Container>
        <Card>
          <Card.Header>
            {`Drugs(${pharma_company.name})`}
            <Link id="newDrug" to={`/pharma_companies/${pharma_company.id}/drugs/new`}><button className="btn btn-primary float-right">Add New</button></Link>
          </Card.Header>
					<Card.Body>
            <BootstrapTable
              keyField="id"
              data={drugs}
              columns={columns}
            />
					</Card.Body>
        </Card>
      </Container>
     )
  }
}