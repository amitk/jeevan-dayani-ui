import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './Navbar.js';
import Doctors from './doctors/index.js';
import DoctorCreate from './doctors/create.js';
import DoctorEdit from './doctors/edit.js';
import Clinics from './clinics/index.js';
import ClinicCreate from './clinics/create.js';
import ClinicEdit from './clinics/edit.js'
import PharmaCompanies from './pharmaCompanies/index.js';
import PharmaCompanyCreate from './pharmaCompanies/create.js';
import PharmaCompanyEdit from './pharmaCompanies/edit.js';
import Drugs from './drugs/index.js';
import DrugCreate from './drugs/create.js';
import DrugEdit from './drugs/edit.js';
import TrialConfigurations from './trialConfigurations/index.js';
import TrialConfigurationCreate from './trialConfigurations/create.js';
import TrialConfigurationEdit from './trialConfigurations/edit.js';
import Trials from './trials/index.js';
import TrialCreate from './trials/create.js';
import TrialEdit from './trials/edit.js';
import Patients from './patients/index.js';
import PatientCreate from './patients/create.js';
import PatientEdit from './patients/edit.js';

export const AppLayout = () => (
  <>
		<NavigationBar />
		<BrowserRouter>
			<Switch>
				<Route exact path="/pharma_companies" component={PharmaCompanies} />
				<Route exact path="/pharma_companies/new" component={PharmaCompanyCreate} />
				<Route exact path="/pharma_companies/:id/edit" component={PharmaCompanyEdit} />
				<Route exact path="/pharma_companies/:pharma_company_id/drugs" component={Drugs} />
				<Route exact path="/pharma_companies/:pharma_company_id/drugs/new" component={DrugCreate} />
				<Route exact path="/pharma_companies/:pharma_company_id/drugs/:id/edit" component={DrugEdit} />
				<Route exact path="/doctors" component={Doctors}  />
				<Route exact path="/doctors/new" component={DoctorCreate} />
				<Route exact path="/doctors/:id/edit" component={DoctorEdit} />
				<Route exact path="/clinics" component={Clinics} />
				<Route exact path="/clinics/new" component={ClinicCreate} />
				<Route exact path="/clinics/:id/edit" component={ClinicEdit} />
				<Route exact path="/trial_configurations" component={TrialConfigurations} />
				<Route exact path="/trial_configurations/new" component={TrialConfigurationCreate} />
				<Route exact path="/trial_configurations/:id/edit" component={TrialConfigurationEdit} />
				<Route exact path="/trials" component={Trials} />
				<Route exact path="/trials/new" component={TrialCreate} />
				<Route exact path="/trials/:id/edit" component={TrialEdit} />
				<Route exact path="/trials/:trial_id/patients" component={Patients} />
				<Route exact path="/trials/:trial_id/patients/new" component={PatientCreate} />
				<Route exact path="/trials/:trial_id/patients/:id/edit" component={PatientEdit} />
			</Switch>
		</BrowserRouter>
  </>
)

