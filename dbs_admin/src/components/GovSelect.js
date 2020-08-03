import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import PieChart from './PieChart';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: window.innerWidth*0.4,
        minWidth: 120,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect({data}) {
    const classes = useStyles();
    const [sector, setSector] = React.useState('Airport');

    const handleChange = (event) => {
        setSector(event.target.value);
    };

    return (
        <div class="flex items-center flex-column">
            <div class="pa2 ma2">
                <FormControl className={ classes.formControl }>
                    <InputLabel>Government and Administration</InputLabel>
                    <Select
                        value={ sector }
                        onChange={ handleChange }
                    >
                        <MenuItem value={ 'Airport' }>Airport</MenuItem>
                        <MenuItem value={ 'Banking' }>Banking</MenuItem>
                        <MenuItem value={ 'Bureau-of-Immigration' }>Bureau-of-Immigration</MenuItem>
                        <MenuItem value={ 'Commercial-Tax-Sales-Tax-VAT' }>Commercial-Tax-Sales-Tax-VAT</MenuItem>
                        <MenuItem value={ 'Customs-Excise-and-Service-Tax' }>Customs-Excise-and-Service-Tax</MenuItem>
                        <MenuItem value={ 'Education' }>Education</MenuItem>
                        <MenuItem value={ 'Electricity-and-Power-Supply' }>Electricity-and-Power-Supply</MenuItem>
                        <MenuItem value={ 'Food-and-Drug-Administration' }>Food-and-Drug-Administration</MenuItem>
                        <MenuItem value={ 'Food-Civil-Supplies-and-Consumer-Affairs' }>Food-Civil-Supplies-and-Consumer-Affairs</MenuItem>
                        <MenuItem value={ 'Foreign-Trade' }>Foreign-Trade</MenuItem>
                        <MenuItem value={ 'Forest' }>Forest</MenuItem>
                        <MenuItem value={ 'Health-and-Family-Welfare' }>Health-and-Family-Welfare</MenuItem>
                        <MenuItem value={ 'Income-Tax' }>Income-Tax</MenuItem>
                        <MenuItem value={ 'Insurance' }>Insurance</MenuItem>
                        <MenuItem value={ 'Judiciary' }>Judiciary</MenuItem>
                        <MenuItem value={ 'Labour' }>Labour</MenuItem>
                        <MenuItem value={ 'Municipal-Services' }>Municipal-Services</MenuItem>
                        <MenuItem value={ 'Passport' }>Passport</MenuItem>
                        <MenuItem value={ 'Pension' }>Pension</MenuItem>
                        <MenuItem value={ 'Police' }>Police</MenuItem>
                        <MenuItem value={ 'Post-Office' }>Post-Office</MenuItem>
                        <MenuItem value={ 'Public-Sector-Undertakings' }>Public-Sector-Undertakings</MenuItem>
                        <MenuItem value={ 'Public-Services' }>Public-Services</MenuItem>
                        <MenuItem value={ 'Public-Works-Department' }>Public-Works-Department</MenuItem>
                        <MenuItem value={ 'Railways' }>Railways</MenuItem>
                        <MenuItem value={ 'Religious-Trusts' }>Religious-Trusts</MenuItem>
                        <MenuItem value={ 'Revenue' }>Revenue</MenuItem>
                        <MenuItem value={ 'Slum-Development' }>Slum-Development</MenuItem>
                        <MenuItem value={ 'Social-Welfare' }>Social-Welfare</MenuItem>
                        <MenuItem value={ 'Stamps-and-Registration' }>Stamps-and-Registration</MenuItem>
                        <MenuItem value={ 'Telecom-Services' }>Telecom-Services</MenuItem>
                        <MenuItem value={ 'Transport' }>Transport</MenuItem>
                        <MenuItem value={ 'Urban-Development-Authorities' }>Urban-Development-Authorities</MenuItem>
                        <MenuItem value={ 'Water-and-Sewage' }>Water-and-Sewage</MenuItem>
                        <MenuItem value={ 'Others' }>Others</MenuItem>
                    </Select>
                    <FormHelperText>Select a Government or Administration</FormHelperText>
                </FormControl>
            </div>
            <div class="pa2 ma2">
                <PieChart gov={ sector } data={ data[sector.toLowerCase().replace(/-/g, "_")]}/>
            </div>
        </div>
    );
}
