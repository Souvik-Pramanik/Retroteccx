import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class BarChart extends Component {
    render() {
        const state = {

            series: [{
                data: this.props.data
            }],
            options: {
                chart: {
                    type: 'bar',
                    parentHeightOffset: 15
                },
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
                colors: [
                    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
                    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
                    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
                    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',

                ],
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#fff']
                    },
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                    },
                    offsetX: 0,
                    dropShadow: {
                        enabled: true
                    }
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    categories: this.props.labels
                    // [
                    //     'Airport',
                    //     'Banking',
                    //     'Bureau-of-Immigration',
                    //     'Commercial-Tax-Sales-Tax-VAT',
                    //     'Customs-Excise-and-Service-Tax',
                    //     'Education',
                    //     'Electricity-and-Power-Supply',
                    //     'Food-and-Drug-Administration',
                    //     'Food-Civil-Supplies-and-Consumer-Affairs',
                    //     'Foreign-Trade',
                    //     'Forest',
                    //     'Health-and-Family-Welfare',
                    //     'Income-Tax',
                    //     'Insurance',
                    //     'Judiciary',
                    //     'Labour',
                    //     'Municipal-Services',
                    //     'Passport',
                    //     'Pension',
                    //     'Police',
                    //     'Post-Office',
                    //     'Public-Sector-Undertakings',
                    //     'Public-Services',
                    //     'Public-Works-Department',
                    //     'Railways',
                    //     'Religious-Trusts',
                    //     'Revenue',
                    //     'Slum-Development',
                    //     'Social-Welfare',
                    //     'Stamps-and-Registration',
                    //     'Telecom-Services',
                    //     'Transport',
                    //     'Urban-Development-Authorities',
                    //     'Water-and-Sewage',
                    //     'Others'
                    // ],
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                title: {
                    text: 'Total Reports Submited',
                    align: 'center',
                    floating: true
                },
                tooltip: {
                    theme: 'dark',
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return ''
                            }
                        }
                    }
                }
            },


        };

        return (
            
            <div id="chart">
                <ReactApexChart options={ state.options } series={ state.series } type="bar" height={1000} />
            </div>


        );
    }
}

export default BarChart;
