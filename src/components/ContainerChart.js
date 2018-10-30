import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class ContainerChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    //background: '#f4f4f4',
		            foreColor: '#333'
                },
                xaxis: {
                    categories: []
                },
                plotOptions: {
                    bar: {
                        horizontal: false // if true it would be horizontal
                    }
                },
                fill: {
                    colors: ['#f44336']
                },
                dateLabels: {
                    enabled: false
                },
                title: {
                    text: 'Bitcoin Price Chart',
                    align: 'center',
                    margin: 20,
                    offsetY: 20,
                    style: {
                        fontSize: '25px'
                    }
                }
            },
            series: [{
                name: 'Numbers',
		        data: [855, 397, 272, 229, 100, 157, 333, 999, 1000]
            }]
        }
    }

    componentDidMount() {
        fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
            .then(response => response.json())
            .then(data => this.setState({
                options: {
                    ...this.state.options,
                    xaxis: {
                        categories: Object.keys(data.bpi)
                    }
                },
                series: [{
                    name: 'Price',
                    data: Object.values(data.bpi)
                }] 
            }));
      }

    render() {
        const styling = {
            textAlign: "center",
            fontSize: 20
        };
        const aTag = {
            textDecoration: "none",
            color: '#006bb3'
        }
        return (
            <div>
                <React.Fragment>
                    <Chart 
                        options = {this.state.options}
                        series = {this.state.series}
                        type="line"
                        height= "450"
                        width= "100%"
                    />
                    <div style={styling}>Made by <a style={aTag} href="https://github.com/Radinax">Adrian Beria</a></div>
                </React.Fragment>
            </div>
        )
    }
}

export default ContainerChart;