import React, { Component } from 'react';
import { ApiRequest } from '../sharedApi.js';
import { Redirect } from 'react-router-dom';
import DrugForm from './form.js';

export default class DrugCreate extends Component {

  state = {
    success: false,
    pharmaCompanyId: ""
  }

  componentDidMount() {
    this.setState({ pharmaCompanyId: this.props.match.params.pharma_company_id })
  }

  createDrug = (params) => {
    const { pharmaCompanyId } = this.state;

    ApiRequest('drug', 'post', null, params, { resource: 'pharma_company', id: pharmaCompanyId }).then(response => {
      if(response.status === 200) {
        this.setState({ success: true });
      }
    })
  }

  render() {
    const { success, pharmaCompanyId} = this.state;
    
    if(success) {
      return <Redirect to={`/pharma_companies/${pharmaCompanyId}/drugs`} />
    }

    return (
      <DrugForm
        pharma_company_id={pharmaCompanyId}
        createDrug={(params) => { this.createDrug(params) }}
        create={true}
      />
    )
  }
}