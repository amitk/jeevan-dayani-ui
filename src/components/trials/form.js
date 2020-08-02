import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Container, Card, Form, FormGroup  } from 'react-bootstrap';
import { ApiRequest } from '../sharedApi.js';


export default class TrialForm extends Component {
  state = {
    name: "",
    phase: "",
    phaseOptions: [],
    trialConfiguration: "",
    trialConfigurationOptions: [],
  }

  componentDidMount() {
    this.trialConfigurationOptions();

    if(!this.props.create) {
      ApiRequest('trial', 'get', this.props.trialId, null, null).then(response => {
        let trial = response.data.data.trial;
        let trialConfiguration = response.data.data.trial_configuration;

        this.setState({
          name: trial.name,
          phase: { label: this.returnPhaseLabel(trial.phase), value: trial.phase.toString() },
          trialConfiguration: { label: trialConfiguration.name, value: trialConfiguration.id }
        })
      })
    }

  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  returnPhaseLabel = (phase) => {
    switch(phase.toString()) {
      case "1":
        return "Phase I";
      case "2":
        return "Phase II";
      case "3":
        return "Phase III";
      case "4":
        return "Phase IV";
    }
  }

  phaseOptions = () => {
    return  ["1", "2", "3", "4"].map(p => ({ label: this.returnPhaseLabel(p), value: p }))

  }

  handlePhaseSelect = (phase) => {
    this.setState({ phase });
  }

  trialConfigurationOptions = () => {
    if (this.state.trialConfigurationOptions.length === 0) {
      ApiRequest('trial_configuration', 'get', null, null, null).then(response => {
        this.setState({ trialConfigurationOptions: response.data.data.map(d => ({ label: d.name, value: d.id })) });
      })
    }
  }

  handleTrialConfigurationSelect = (trialConfiguration) => {
    this.setState({ trialConfiguration });
  }

  handleSubmit = () => {
    const { name, phase, trialConfiguration } = this.state;
    let params = {
      trial: {
        name,
        phase: phase.value,
        trial_configuration_id: trialConfiguration.value,
      }
    }

    this.props.create ? this.props.createTrial(params) : this.props.updateTrial(params)
  }

  render() {
    const { name, phase, phaseOptions, trialConfiguration, trialConfigurationOptions } = this.state;

    return (
      <Container>
        <Card>
          <Card.Header>
            Trial
          </Card.Header>
					<Card.Body>
            <Form>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={this.handleNameChange}></Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Phase</Form.Label>
                <Select
                  value={phase}
                  onChange={this.handlePhaseSelect}
                  options={this.phaseOptions()}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Trial Configuration</Form.Label>
                <Select
                  value={trialConfiguration}
                  onChange={this.handleTrialConfigurationSelect}
                  options={trialConfigurationOptions}
                />
              </FormGroup>
            </Form>
					</Card.Body>
          <Card.Footer>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>{' '}
            <Link id="cancel" to={`/trial_configurations`}><button className="btn btn-secondary">Cancel</button></Link>
          </Card.Footer>
        </Card>
      </Container>      
    )
  }
}