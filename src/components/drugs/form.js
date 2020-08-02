import React, { Component } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';


export default class DrugForm extends Component {

  state = {
    name: "",
    targetAilment: { label: "", value: "" },
    sideEffects: "",
    pharma_company: {},
    success: false,
  }
  
  componentWillMount() {
    //get pharma company
    const { pharmaCompanyId, drugId } = this.props;
    
    ApiRequest('pharma_company', 'get', pharmaCompanyId, null, null).then(response => {
      this.setState({ pharma_company: response.data.data })
    })

    if(!this.props.create) {
      ApiRequest('drug', 'get', drugId, null, { resource: 'pharma_company', id: pharmaCompanyId }).then(response => {
        let pharmaCompany = response.data.data
        this.setState({
          name: pharmaCompany.name,
          targetAilment: { label: pharmaCompany.target_ailment, value: pharmaCompany.target_ailment },
          sideEffects: pharmaCompany.side_effects.map(se => ({ label: se, value: se }))
        })
      })
    }
  }
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onTargetAilmentSelect = (targetAilment) => {
    this.setState({ targetAilment });
  }

  onSideEffectsSelect = (sideEffects) => {
    this.setState({ sideEffects });
  }

  returnAilmentOptions = () => {
    return ["Lungs", "Heart", "Brain", "Eyes", "Stomach", "Kidney", "Liver", "Intestine"].map(
      part => ({ label: part, value: part }))
  }

  returnSideEffectOptions = () => {
    return ["Constipation", "Skin Rash", "Sickness", "Dazziness",  "Drowsiness", "Dry Mouth", "Insomia"].map(
      se => ({ label: se, value: se})
    )
  }

  handleSubmit = () => {
    const { name, targetAilment, sideEffects } = this.state;
    let params = {
      drug: {
        name,
        target_ailment: targetAilment.value,
        side_effects: sideEffects.map(se => se.value),
      }
    }

    this.props.create ? this.props.createDrug(params) : this.props.updateDrug(params)
  }

  render() {
    const { name, targetAilment, sideEffects, pharma_company, success } = this.state;

    if (success) {
      return <Redirect to={`/pharma_companies/${pharma_company.id}/drugs`} />
    }
    return (
      <Container>
        <Card>
          <Card.Header>
            Drug
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Target Ailment</Form.Label>
                <Select
                  value={targetAilment}
                  onChange={this.onTargetAilmentSelect}
                  options={this.returnAilmentOptions()} 
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Side Effects</Form.Label>
                <Select
                  value={sideEffects}
                  onChange={this.onSideEffectsSelect}
                  isMulti
                  closeMenuOnSelect={false}
                  options={this.returnSideEffectOptions()}
                />
              </FormGroup>
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/pharma_companies`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>      
    )
  }
}