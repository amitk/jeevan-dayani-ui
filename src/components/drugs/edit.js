import React, { Component } from 'react';
import DrugForm from './form.js';
import { ApiRequest } from '../sharedApi.js';
import { Redirect } from 'react-router-dom';

export default class DrugEdit extends Component {
  state = {
    drugId: "",
    pharmaCompanyId: "",
    success: false,
  }

  componentDidMount() {
    this.setState({
      drugId: this.props.match.params.id,
      pharmaCompanyId: this.props.match.params.pharma_company_id
    })
  }

  updateDrug = (params) => {
    const { drugId, pharmaCompanyId } = this.state;

    ApiRequest('drug', 'put', drugId, params, { resource: 'pharma_company', id: pharmaCompanyId }).then(response => {
      if(response.status === 200) {
        this.setState({ success: true });
      }
      console.log('Drug updated Successfully');
    })
  }

  render() {
    const { pharmaCompanyId, success, drugId } = this.state;

    if(success) {
      return <Redirect to={`/pharma_companies/${pharmaCompanyId}/drugs`} />
    }

    return (
      <DrugForm
        drugId={this.props.match.params.id}
        pharmaCompanyId={this.props.match.params.pharma_company_id}
        updateDrug={(params) => {this.updateDrug(params)}}
      />
    )
  }
}