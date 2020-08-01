import React, { Component } from 'react';
import { API } from './API';
import Row from './Row';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const columns = ["Report ID", "Person Name", "Govnt. and Admin.", "Area of Govnt. and Admin.", "Incident Date", "Person Contact", "Last Modified", "Last Reviewed By"];
const column = columns.map((value) => <div class="outline w-25 pa1 ph4 flex justify-center items-center"><h6>{ value }</h6></div>)                                                                   

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filtered: []
    };
  }
  
  componentDidMount(){
    fetch(API + '/adminfetch', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+this.props.token
      }
    })
    .then(response => {
      if (!response.ok) {
        alert('Oops! Could not fetch data')
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data=>{
      this.setState({rows: data.rows})
    })
    .catch(console.log)
  }

  handleSearch = (id) => {
    var rows = this.state.rows.filter((row)=>row.report_id==Number(id));
    this.setState({filtered: rows})
  }

  render() {
    return (
      <div class="vh-100">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a class="navbar-brand" href="index.html">DBS Admin</a>
          <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div class="input-group">
              <input class="form-control" onChange={(txt)=>this.handleSearch(txt.target.value)} type="text" placeholder="Search with report id..." aria-label="Search" aria-describedby="basic-addon2" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </form>
          <Button
            onClick={()=>{
              this.props.setState({admin_id: null, token: ''})
              this.props.goTo('signin')
            }}
            variant="contained"
            color="default"
            startIcon={ <ExitToAppIcon /> }
          >
            Sign out
          </Button>

        </nav>
        <div class="flex ml5 bg-near-white fixed">
              {column}
            </div>
            <div style={{marginTop: 70}}>
          { 
            (this.state.filtered.length > 0)?
              this.state.filtered.map((value) => (<Row row={ value } token={ this.props.token } admin_id={ this.props.admin_id } />))
              :
              this.state.rows.map((value) => (<Row row={ value } token={this.props.token} admin_id={this.props.admin_id}/>))
          }
            </div>
        </div>
    );
  }
}

export default Home;