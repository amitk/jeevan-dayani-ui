import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PharmaCompanyForm from './form.js';
import { ApiRequest } from '../sharedApi.js';

export default class PharmaCompanyCreate extends Component {

	state = {
		success: false,
	}

	createPharmaCompany = (params) => {
		ApiRequest('pharma_company', 'post', null, params, null).then(response => {
			this.setState({ success: true })
			console.log(response, 'response');
		})
	}

	render() {
		const { success, variable } = this.state;

    if (success) {
      return <Redirect to={'/pharma_companies'} />
    }

		return (
			<PharmaCompanyForm
				create={true}
				createPharmaCompany={(params) => this.createPharmaCompany(params)}
			/>
		)
	}
}