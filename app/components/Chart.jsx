import React, { Component } from 'react';

import { Scatter } from 'react-chartjs-2';

type Content = { x: number, y: number };

type Props = {
  chartData: Array<Content>,
  chartTension?: number,
  xLabel?: string,
  yLabel?: string
};

class Chart extends Component<Props> {
  static defaultProps = {
    chartTension: 0.5,
    xLabel: 'x-Axis',
    yLabel: 'y-Axis'
  };

  constructor(props) {
    super(props);

    const { chartTension, xLabel, yLabel } = this.props;

    this.state = {
      data: canvas => {
        const ctx = canvas.getContext('2d');
        const gradientStroke = ctx.createLinearGradient(0, 0, 0, canvas.height);

        gradientStroke.addColorStop(0, 'rgba(66,134,121,1)');
        gradientStroke.addColorStop(0.5, 'rgba(66,134,121,0.3)');
        gradientStroke.addColorStop(1, 'rgba(66,134,121,0)');

        const { chartData } = this.props;

        return {
          datasets: [
            {
              data: chartData,
              lineTension: chartTension,

              label: 'cum',
              fill: true,
              showLine: true,
              backgroundColor: gradientStroke,
              borderColor: '#00d6b4',
              borderWidth: 2,

              pointBackgroundColor: '#00d6b4',
              pointBorderColor: '#00d6b4',
              pointHoverBackgroundColor: '#00d6b4',
              pointHoverBorderColor: '#fff',
              pointRadius: 3,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 2
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        animation: {
          duration: 2000
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: true,
          reverse: false,
          onClick: null,
          onHover: null,
          position: 'right',
          labels: {
            boxWidth: 40,
            fontSize: 12,
            fontStyle: 'normal',
            fontColor: '#ccc',
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            padding: 20,
            usePointStyle: true
          }
        },
        title: {
          text: '',
          display: false,
          position: 'top',
          fontSize: 18,
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontColor: '#ccc',
          fontStyle: 'bold',
          padding: 10,
          lineHeight: 1
        },
        tooltips: {
          enable: true,
          custom: null,
          mode: 'nearest',
          intersect: false,
          position: 'average',
          backgroundColor: '#f5f5f5',
          titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          titleFontSize: 12,
          titleFontStyle: 'bold',
          titleFontColor: '#333',
          titleSpacing: 2,
          titleMarginBottom: 6,
          bodyFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          bodyFontSize: 12,
          bodyFontStyle: 'normal',
          bodyFontColor: '#666',
          bodySpacing: 4,
          footerFontFamily:
            "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          footerFontSize: 12,
          footerFontStyle: 'bold',
          footerFontColor: '#666',
          footerSpacing: 2,
          footerMarginTop: 6,
          xPadding: 6,
          yPadding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          multiKeyBackground: '#fff',
          displayColors: true,
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 0
          // callbacks: {
          //   beforeTitle : function(tooltipItem, data) {
          //     return '';
          //   },
          //   footer : function(tooltipItem, data) {
          //     return '';
          //   }
          // }
        },
        scales: {
          yAxes: [
            {
              type: 'linear',
              position: 'left',
              gridLines: {
                display: true,
                drawBorder: false,
                color: 'rgba(255,255,255,0.3)',
                borderDash: [5, 5],
                borderDashOffset: 0,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickMarkLength: 10,

                zeroLineWidth: 2,
                zeroLineColor: 'rgba(255,255,255,0.5)',
                zeroLineBorderDash: [5, 5],
                zeroLineBorderDashOffset: 0,

                offsetGridLines: false
              },
              scaleLabel: {
                display: true,
                labelString: yLabel,
                lineHeight: 1,

                fontSize: 12,
                fontFamily:
                  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontStyle: 'normal',
                fontColor: '#ccc',

                padding: 4
              },
              ticks: {
                display: true,
                reverse: false,
                beginAtZero: false,
                // precision: 1,
                // stepSize: 5,
                autoSkip: true,
                autoSkipPadding: 0,
                labelOffset: 0,
                mirror: false,
                // min: 0,
                // suggestedMin: 10,
                // max: 125,
                // suggestedMax: 125,

                maxRotation: 90,
                minRotation: 0,

                padding: 10,

                fontSize: 12,
                fontFamily:
                  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontStyle: 'normal',
                fontColor: '#ccc'
              }
            }
          ],
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              gridLines: {
                display: true,
                drawBorder: false,
                color: 'rgba(255,255,255,0.3)',
                // borderDash: [5,8],
                borderDashOffset: 0,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: false,
                tickMarkLength: 10,

                zeroLineWidth: 2,
                zeroLineColor: 'rgba(255,255,255,0.5)',
                // zeroLineBorderDash: [5,5],
                zeroLineBorderDashOffset: 0,

                offsetGridLines: false
              },
              scaleLabel: {
                display: true,
                labelString: xLabel,
                lineHeight: 1,

                fontSize: 12,
                fontFamily:
                  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontStyle: 'normal',
                fontColor: '#ccc',

                padding: 4
              },
              ticks: {
                display: true,
                reverse: false,
                beginAtZero: false,
                // precision: 1,
                // stepSize: 1,
                autoSkip: true,
                autoSkipPadding: 0,
                labelOffset: 0,
                mirror: false,
                maxRotation: 90,
                minRotation: 0,

                padding: 10,

                fontSize: 12,
                fontFamily:
                  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontStyle: 'normal',
                fontColor: '#ccc'
              }
            }
          ]
        }
      }
    };
  }

  render() {
    const { data, options } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <Scatter data={data} options={options} />
      </div>
    );
  }
}

export default Chart;
