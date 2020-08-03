import React, { Component } from 'react';
import { API } from './API';
import Row from './Row';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Nav, Navbar, Form, FormControl} from 'react-bootstrap';
import BarChart from './BarChart';
import GovSelect from './GovSelect';
import PaperUser from './Paper';

const columns = ["Report ID", "Person Name", "Govnt. and Admin.", "Area of Govnt. and Admin.", "Incident Date", "Person Contact", "Last Modified", "Last Reviewed By"];
const column = columns.map((value) => <div class="outline w-25 pa1 ph4 flex justify-center items-center"><h6>{ value }</h6></div>)                                                                   

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'all',
      rows: [],
      filtered: [],
      data: {},
      userrows: []
      /*[
        4109,
        7128,
        2294,
        2919,
        6722,
        6340,
        8201,
        6792,
        6854,
        7958,
        875,
        289,
        9620,
        2237,
        2590,
        5009,
        5201,
        6807,
        5340,
        7687,
        5052,
        8716,
        1592,
        9409,
        5322,
        5935,
        2060,
        8071,
        5579,
        7731,
        5034,
        4667,
        7472,
        4368,
        9338,

      ]*/
    };
  }

  analyticFetch=()=>{
    fetch(API + '/analyticsfetch', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
      .then(response => {
        if (!response.ok) {
          alert('Oops! Could not fetch data')
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ data: data })
      })
      .catch(console.log)
  }

  fetchReports = () => {
    // this.setState({ refreshing: true })
    fetch(API + '/userhomefetch', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ userrows: data.row })
      })
      .catch(console.log)
    // this.setState({ refreshing: false })
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

    this.analyticFetch()
    this.fetchReports()
  }

  handleSearch = (id) => {
    var rows = this.state.rows.filter((row)=>row.report_id==Number(id));
    this.setState({filtered: rows})
  }

  render() {
    return (
      <div class="vh-100">
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>DBS Admin</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={ () => this.setState({ route: 'all' }) }>All Reports</Nav.Link>
              <Nav.Link onClick={ () => this.setState({ route: 'analytic' }) }>Analytics</Nav.Link>
              <Nav.Link onClick={ () => this.setState({ route: 'user' })}>User Experience</Nav.Link> 
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search by report id..." className="mr-sm-2" onChange={ (txt) => this.handleSearch(txt.target.value) } />
              <Button
                onClick={ () => {
                  this.props.setState({ admin_id: null, token: '' })
                  this.props.goTo('signin')
                } }
                variant="contained"
                color="default"
                startIcon={ <ExitToAppIcon /> }
              >
                Sign out
          </Button>
            </Form>
          </Navbar>
        </div>
        {
          this.state.route == 'all'?
          (
            <div class="flex flex-column">
            <div class="flex ml5 bg-near-white fixed">
                { column }
            </div>
            <div style={ { marginTop: 70 } }>
              {
                (this.state.filtered.length > 0) ?
                  this.state.filtered.map((value) => (<Row row={ value } token={ this.props.token } admin_id={ this.props.admin_id } />))
                  :
                  this.state.rows.map((value) => (<Row row={ value } token={ this.props.token } admin_id={ this.props.admin_id } />))
              }
            </div>
            </div>
          )
          :
          (
            this.state.route == 'analytic'?
            (
                <div>
                  <div class="ma2 pa3">
                    <BarChart data={ this.state.data.totals } labels={ this.state.data.labels } />
                  </div>
                  <div>
                    <GovSelect data={ this.state.data.categorical } />
                  </div>
                </div>
            )
            :
            (
                  <div class="flex flex-column items-center" style={ { backgroundColor: "rgba(34,138,233,1)"}}>
                {this.state.userrows.map((value)=><PaperUser data={value}/>)}
              </div>
            )
            
          )
        }
        </div>
    );
  }
}

export default Home;