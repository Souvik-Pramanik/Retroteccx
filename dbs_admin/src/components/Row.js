import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import TextField from '@material-ui/core/TextField';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import { API } from './API';

const statuses = [
    {
        value: 'Not Reviewed',
        label: 'Not Reviewed',
    },
    {
        value: 'Under Process',
        label: 'Under Process',
    },
    {
        value: 'Closed',
        label: 'Closed',
    },
];

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
        expanded: false,
        status: this.props.row.status,
        feedback: this.props.row.status_feedback
    };
  }

  expandHandle=()=>{
    this.setState({expanded: !this.state.expanded})
  }

  dropDownHandle = (event)=>{
    this.setState({status: event.target.value})
  }

  feedBackHandle = (event)=>{
      this.setState({ feedback: event.target.value })
  }

  handleDownload = () => {
      console.log(this.props.row.files)
      fetch(API + '/admindownload', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.token
          },
          body: JSON.stringify({
              files: this.props.row.files
          })
      })
          .then(response => {
              console.log(response)
              if (!response.ok) {
                  alert('There was a problem svaing the changes')
                  throw new Error('Network response was not ok');
              }
              return response.blob()
          })
          .then((blob) => {
              console.log(blob)
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
            //   if(blob.type.split('/')[1] == 'pdf')
                a.download = "report_id_"+this.props.row.report_id.toString()+".zip";
              document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
              a.click();
              a.remove();
          })
          .catch(console.log)
  }

  handleSave = ()=>{
    //   console.log(this.state)
    fetch(API +'/adminfeedback',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
        },
        body: JSON.stringify({
            status: this.state.status,
            status_feedback: this.state.feedback,
            user_id: Number(this.props.row.user_id),
            report_id: Number(this.props.row.report_id),
            admin_id: Number(this.props.admin_id),
        })
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            alert('There was a problem svaing the changes')
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then((data)=>{
            alert('Changes were saved.');
            this.setState({status: data.status, feedback: data.feedback});
    })
    .catch(console.log)
  }

  render() {
    return (
        <div>
            <div class="flex bb">
                
                <IconButton aria-label="Dropdown" style={{padding: 20}} onClick={ this.expandHandle }>
                    { this.state.expanded
                        ?<ArrowDropUpIcon />
                        : <ArrowDropDownIcon />
                    }
                </IconButton>
                            {/* report_id: 7,
                            gov_admin: 'Airport',
                            area_of_gov_admin: 'Airlines and Baggage',
                            report_city: 'Amalapuram',
                            report_details: 'malamalamlamalmalmalmalmalalamlamalmmalmalmlmalamlamlam',
                            for_self: 'self ',
                            incident_date: 'Wed Feb 05 2020 00:00:00 GMT+0530 (IST)',
                            files: [
                            'UploadsApplications1595843206991_mal@mal1.mal_A_Sample PDF.pdf'
                            ],
                            report_submit_on: 2020-07-27T09:46:47.225Z,
                            user_email: 'mal@mal1.mal',
                            status_id: null,
                            status: null,
                            status_feedback: null,
                            user_name: 'pool danger mal',
                            user_contact: 1234571191,
                            created_at: null,
                            name: null */}
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.report_id }</h6></div>
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.user_name }</h6></div>
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.gov_admin }</h6></div>
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.area_of_gov_admin }</h6></div>
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.incident_date }</h6></div>
                <div class="w-25 pa1 flex justify-center items-center flex-column">
                    <h6>{ this.props.row.user_contact }</h6>
                    <h6>{ this.props.row.user_email }</h6>
                </div>
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.created_at ? this.props.row.created_at: 'Not Reviewed' }</h6></div>
                <div class="w-25 pa1 flex justify-center items-center"><h6>{ this.props.row.name ? this.props.row.name : 'Not Reviewed'}</h6></div>
            </div>
            {
                this.state.expanded
                ? 
                    (<div class="flex flex-column bg-washed-blue items-center">
                        <div class="flex justify-between">
                            <Card style={{margin: 10, padding: 15, display: 'flex', height: 50, alignItems: 'center'}}>
                                <p style={ { margin: 5 } }><b>Reported for: </b>{this.props.row.for_self}</p>
                                <p style={ { margin: 5 } }><b>Reported on: </b>{this.props.row.report_submit_on.slice(0,10)}</p>
                                <p style={ { margin: 5 } }><b>Reported place: </b>{this.props.row.report_city} </p>
                            </Card>
                            <Card style={ { padding: 15, width: window.innerWidth * 0.4, margin: 10}}>
                                <b style={ { margin: 5 } }>Report details: </b>
                                <p style={ { margin: 5 } }> { this.props.row.report_details } </p>
                            </Card>
                        </div>
                        <div class="flex justify-around items-center pa3 bb">
                            <div>
                                <Button
                                    onClick={ this.handleDownload }
                                    variant="contained"
                                    color="primary"
                                    style={ { margin: 10 } }
                                    startIcon={ <CloudDownloadIcon color='white'/> }>
                                    Download Evidence
                                </Button>
                                <Button
                                    onClick={ this.handleSave }
                                    variant="contained"
                                    style={ { backgroundColor: 'rgba(24,178,24,1)', color: 'white', margin: 10 } }
                                    startIcon={ <SaveIcon color='white' /> }>
                                    Save Changes
                                 </Button>
                            </div>
                            <div class="pa3">
                            <TextField
                                id="outlined-select-currency-native"
                                style={ { width: window.innerWidth * 0.2 } }
                                select
                                label="Change Status"
                                value={ this.state.status ? this.state.status: statuses[0].value }
                                onChange={ this.dropDownHandle }
                                SelectProps={ {
                                    native: true,
                                } }
                                helperText="Change status"
                                variant="outlined"
                            >
                                { statuses.map((option) => (
                                    <option key={ option.value } value={ option.value }>
                                        { option.label }
                                    </option>
                                )) }
                            </TextField>
                        </div>
                        <div class="pa3">
                            <TextField
                                style={{width: window.innerWidth*0.5}}
                                id="outlined-multiline-static"
                                label="Give Feedback"
                                onChange={this.feedBackHandle}
                                multiline
                                rows={ 4 }
                                defaultValue={ this.state.status_feedback ? this.state.status_feedback : null}
                                variant="outlined"
                            />
                        </div>
                    </div>
                    </div>
                )
                : null
            }
        </div>
                 
    );
  }
}

export default Row;
