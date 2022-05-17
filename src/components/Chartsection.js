import React, { Component } from 'react'
import Chart from "react-apexcharts";
class Chartsection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Price: {
                options: {
                    chart: {
                        id: 'area-datetime',
                       
                        zoom: {
                            enabled: true,
                            type: 'x',  
                            autoScaleYaxis: false,  
                            zoomedArea: {
                              fill: {
                                color: '#90CAF9',
                                opacity: 0.4
                              },
                              stroke: {
                                color: '#0D47A1',
                                opacity: 0.4,
                                width: 1
                              }
                            }
                        },
                        toolbar: {
                            show: true,
                            offsetX: 0,
                            offsetY: 0,
                            tools: {
                              download: false,
                              selection: true,
                              zoom: false,
                              zoomin: true,
                              zoomout: false,
                              pan: false,
                              reset: false | '<img src="/static/icons/reset.png" width="20">',
                              customIcons: []
                            }
                        },
                        sparkline: {
                            enabled: true
                          }
                        
                    },
                    grid: {
                        show: false
                    }, title: {
                        // text: "Market Price (USD)",
                        style: {
                            fontSize: '14px', fontWeight: 'bold', color: "#fcdf03"
                        }
                    }, stroke: {
                        curve: 'smooth'
                    }, xaxis: {
                        type: "datetime"
                    }, dataLabels: {
                        enabled: false
                    }, yaxis: {
                        show: false
                    }, colors: ["#A020F0"],
                    tooltip: {
                        y: {
                            formatter: (value) => { return value.toFixed(2) }
                        }, theme: "dark"
                    }, selection: 365,
                    
                },
                series: [
                    {
                        name: 'Market Price',
                        data: [[1645837250522, 39804.53519937617]]

                    }
                ]
            }
        };
        this.prevSelection = this.state.Price.options.selection
    }
    prevId = this.props.Id

    fetchData = async () => {
        let chartData = await fetch('https://api.coingecko.com/api/v3/coins/' + this.props.Id + '/market_chart?vs_currency=usd&days=' + this.state.Price.options.selection);
        let jsonChartData = await chartData.json()
        this.setState({ Price: { options: this.state.Price.options, series: [{ name: 'Market Price', data: jsonChartData.prices }] } })
        this.setState({ Market_Cap: { options: this.state.Market_Cap.options, series: [{ name: 'Market Price', data: jsonChartData.market_caps }] } })
        this.setState({ Tot_Vol: { options: this.state.Tot_Vol.options, series: [{ name: 'Market Price', data: jsonChartData.total_volumes }] } })

    }
    componentDidMount() {
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 2000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    componentDidUpdate() {
        if (this.prevId !== this.props.Id) {
            this.prevId = this.props.Id
            this.fetchData()
        }
        if (this.prevSelection !== this.state.Price.options.selection) {
            this.prevSelection =this.state.Price.options.selection
            this.fetchData()
        }
    }
  render() {
    return (
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
             <div>
             <div>
                <div>
                    <div style={{font:'bold', fontSize:'50px',marginTop:'30px',marginBottom:'30px'}}>
                        $ {this.props.MarketCap} USD
                    </div>
                </div>

                 <div>
                     <div id="chart" style={{border:'1px solid #efefef'}}>
                         <div className="toolbar">
                             <button id="one_month"

                                 onClick={() => this.setState({ Price: { options:{...this.tooltip,selection: 1},series: this.state.Price.series }})}>
                                 1D
                             </button>
                             &nbsp;
                             <button id="six_months"

                                 onClick={() => this.setState({ Price: { options:{...this.tooltip,selection: 7},series: this.state.Price.series }})}>
                                 1W
                             </button>
                             &nbsp;
                             <button id="one_year"


                                 onClick={() => this.setState({ Price: { options:{...this.tooltip,selection: 30},series: this.state.Price.series }})}>
                                 1M
                             </button>
                             &nbsp;
                             <button id="ytd"

                                 onClick={() => this.setState({ Price: { options:{...this.tooltip,selection: 182},series: this.state.Price.series }})}>
                                 6M
                             </button>
                             &nbsp;
                             <button id="all"

                                 onClick={() => this.setState({ Price: { options:{...this.tooltip,selection: 365},series: this.state.Price.series }})}>
                                 1Y
                             </button>
                         </div>
                         <Chart
                             options={this.state.Price.options}
                             series={this.state.Price.series}
                             type="line"
                             height='400'
                             width='600' />
                     </div>
                 </div>
                


                 </div>
               
             </div>
         </div>

    )
  }
}

export default Chartsection