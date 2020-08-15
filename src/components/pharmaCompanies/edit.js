import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ApiRequest } from '../sharedApi.js';
import PharmaCompanyForm from './form.js';

export default class PharmaCompanyEdit extends Component {
  state = {
		success: false,
	}
	
	updatePharmaCompany = (params) => {
		ApiRequest('pharma_company', 'put', this.props.match.params.id, params, null).then(response => {
			this.setState({ success: true })
			console.log(response, 'response');
		})
	}

  render() {
		const { success } = this.state;

		if (success) {
			return <Redirect to={'/pharma_companies'} />
		}
		
		return (
			<PharmaCompanyForm
				create={false}
				updatePharmaCompany={(params) => this.updatePharmaCompany(params)}
				pharmaCompanyId={this.props.match.params.id}
			/>
			)
  }
}