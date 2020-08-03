import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends Component {
    
    AreaOfGovAndAdmin = (gov) => {
        
        var catAndActs = {};
        catAndActs['Airport'] = [
            'Airlines and Baggage',
            'Customs',
            'Immigration',
            'Airport Facilities',
            'Other'
        ];
        catAndActs['Banking'] = [
            'Exchanges and Deposits of Cash',
            'Rules and Regulations',
            'Loans',
            'Other'
        ];
        catAndActs['Bureau-of-Immigration'] = [
            'Visa',
            'Illigal Resident',
            'Other'
        ];
        catAndActs['Commercial-Tax-Sales-Tax-VAT'] = [
            'VAT',
            'Service Tax',
            'Professional Tax',
            'Commercial Tax',
            'Sales Tax',
            'Other'
        ];
        catAndActs['Customs-Excise-and-Service-Tax'] = [
            'Service Tax',
            'Excise',
            'Custom Check and Clearance',
            'Others'
        ];
        catAndActs['Education'] = [
            'School or College Related',
            'Scholarships',
            'Pension Processing',
            'Marks Cards and Transcripts',
            'Employee Grievances',
            'Certificates',
            'Others'
        ];
        catAndActs['Electricity-and-Power-Supply'] = [
            'Transformers',
            'Services',
            'Policies and Procedures',
            'Payment and Arrears',
            'Employee Grievances',
            'Electricity Connection',
            'Electric Meters',
            'Domestic',
            'Commercial and Industrial',
            'Others'
        ];
        catAndActs['Food-and-Drug-Administration'] = [
            'Policies and Procedures',
            'Pharmacy',
            'Food License',
            'Drug License',
            'Others'
        ];
        catAndActs['Food-Civil-Supplies-and-Consumer-Affairs'] = ['Ration Card', 'LPG Gas Cylinder', 'Food and Supply', 'Fire License', 'Others'];
        catAndActs['Foreign-Trade'] = ['Policies and Procedures', 'Embezzlement', 'Trading in influence', 'Patronage', 'Nepotism', 'Cronyism', 'Gombeenism', 'Parochialism', 'Corrupt Bidding (Kickbacks)', 'Unholy Alliance', 'Involvement in Organized Crime', 'Others'];
        catAndActs['Forest'] = ['Saplings and Tree Cover', 'Timber Related', 'Protected Forest and Sanctuaries', 'Others'];
        catAndActs['Health-and-Family-Welfare'] = ['Pest Control', 'Hospitals and Medical Care', 'Health Services', 'Health and Family', 'Government Schemes', 'Employee State Insurance', 'Employee Grievance', 'Disability Related', 'Others'];
        catAndActs['Income-Tax'] = ['TAN', 'Policies and Procedures', 'PAN', 'Income Tax', 'Others'];
        catAndActs['Insurance'] = ['Insurance Application and Claims', 'Report about a Third Party vendors Contracted by Companies', 'Report about a Bribery incident in a Insurance Company', 'Report about a Malpractice in a Insurance Company', 'Report about a Fraudulent Insurance Company', 'Report about a Fraudulent Insurance Employee', 'Report about a poor due diligence in writing policies by Insurance Companies', 'Report about a Novel Fraud Incident', 'Report about a Lower Premium Incident', 'Others'];
        catAndActs['Judiciary'] = ['Services', 'Policies and Procedures', 'PIL', 'Notary', 'Court Related', 'Others'];
        catAndActs['Labour'] = ['Employee State Insurance', 'Registrations and Licenses', 'Provident Fund', 'Policies and Procedures', 'Pension', 'Employee Grievances', 'Report a Malpractice Incident in Hiring', 'Report a Malpractice Incident in Firing', 'Others'];
        catAndActs['Municipal-Services'] = ['Voter Registration', 'TAX', 'Services', 'Registrations and Licenses', 'Policies and Procedures', 'Patta', 'Land Registrations', 'Khata', 'Domicile and Residence', 'Death and Bereavement', 'Certificates', 'Caste, Community and Income', 'Building and Housing', 'Birth, Family and Care', 'Aadhaar Card', 'Other'];
        catAndActs['Passport'] = ['Policies and Procedures', 'Passport Status and Delivery', 'OCI and PIO', 'Issue and Renewal of Passport', 'Certificates', 'Others'];
        catAndActs['Pension'] = ['Pension Transfers', 'Pension Settlements', 'Pension Processing', 'Others'];
        catAndActs['Police'] = ['Verification and Certificates', 'Traffic Fines, Penalties, Rules', 'Registrations and Licenses', 'Policies and Procedures', 'FIR and Complaints', 'Others'];
        catAndActs['Post-Office'] = ['Savings Schemes', 'Post and Parcel', 'Policies and Procedures', 'Money Order and Passbook', 'Others'];
        catAndActs['Public-Sector-Undertakings'] = ['Policies and Procedures', 'Other'];
        catAndActs['Public-Services'] = ['Rules and Regulations', 'Policies and Procedures', 'Government Personnel', 'Certificates', 'Others'];
        catAndActs['Public-Works-Department'] = ['Policies and Procedures', 'Government Personnel', 'Others'];
        catAndActs['Railways'] = ['Policies and Procedures', 'Transport of Luggage and Goods', 'Ticket and Seat Related', 'Railway Services', 'Fines Penalties', 'Others'];
        catAndActs['Religious-Trusts'] = ['Religious Institutions', 'Others'];
        catAndActs['Revenue'] = ['Caste, Community and Income', 'Certificates', 'Land Registration', 'Others'];
        catAndActs['Slum-Development'] = ['Rules and Regulations', 'Housing', 'Others'];
        catAndActs['Social-Welfare'] = ['Registrations and licenses', 'Government Schemes', 'Certificates', 'Others'];
        catAndActs['Stamps-and-Registration'] = ['Registrations and licenses', 'Property Registrations', 'Policies and Procedures', 'Marriage Certificate and Registration', 'Khata', 'Certificates', 'Others'];
        catAndActs['Telecom-Services'] = ['Telephone and Internet Connection', 'Bills and Payment', 'Others'];
        catAndActs['Transport'] = ['Vehicle Insurance', 'Vehicle Fitness', 'Traffic Fines, Penalties, Rules', 'Tax and Permits', 'Services', 'Public Transport', 'Number Plates and Vehicle Registration', 'Driving Licenses and Tests', 'Driving and Transport Business', 'Others'];
        catAndActs['Urban-Development-Authorities'] = ['Services', 'Registrations and licenses', 'Policies and Procedures', 'Land Related', 'Certificates', 'Building and Housing', 'Others'];
        catAndActs['Water-and-Sewage'] = ['Water Supply', 'Water Meter', 'Water Connection', 'Sewage Connection', 'Services', 'Rules and Regulations', 'Rainwater Harvesting', 'Borewells', 'Bills and Payment'];
        catAndActs['Others'] = ['Others'];
        if(gov)
        return catAndActs[gov];
        else
        return[]
    }

    render() {
        console.log(this.props.data)
        const options = {

            series: this.props.data,
            options: {
                chart: {
                    type: 'donut',
                },
                labels: this.AreaOfGovAndAdmin(this.props.gov),
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },


        };
        return (
            <div id="chart">
                <ReactApexChart options={ options.options } series={ options.series } type="donut" width={window.innerWidth*0.5}/>
            </div>


        );
    }
}
export default PieChart;
