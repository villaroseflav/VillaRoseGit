import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorData } from '../../../../core/models/sensor-data.interface';

@Component({
  selector: 'app-bartwo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bartwo.component.html',
  styleUrl: './bartwo.component.scss'
})
export class BartwoComponent implements OnInit {
  @Input() data: SensorData[] = [];
  
  ngOnInit() {
    // var optionsBar = {
    //   chart: {
    //     type: 'bar',
    //     height: 250,
    //     width: '100%',
    //     stacked: true,
    //     foreColor: '#999',
    //   },
    //   plotOptions: {
    //     bar: {
    //       dataLabels: {
    //         enabled: false,
    //       },
    //       columnWidth: '75%',
    //       endingShape: 'rounded',
    //     },
    //   },
    //   colors: ['#00C5A4', '#F3F2FC'],
    //   series: [
    //     {
    //       name: 'Sessions',
    //       data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
    //     },
    //     {
    //       name: 'Views',
    //       data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
    //     },
    //   ],
    //   labels: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4],
    //   xaxis: {
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     crosshairs: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //       style: {
    //         fontSize: '14px',
    //       },
    //     },
    //   },
    //   grid: {
    //     xaxis: {
    //       lines: {
    //         show: false,
    //       },
    //     },
    //     yaxis: {
    //       lines: {
    //         show: false,
    //       },
    //     },
    //   },
    //   yaxis: {
    //     axisBorder: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //     },
    //   },
    //   legend: {
    //     floating: true,
    //     position: 'top',
    //     horizontalAlign: 'right',
    //     offsetY: -36,
    //   },
    //   title: {
    //     text: 'Web Statistics',
    //     align: 'left',
    //   },
    //   subtitle: {
    //     text: 'Sessions and Views',
    //   },
    //   tooltip: {
    //     shared: true,
    //     intersect: false,
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    // };


    var options = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };

    var chart = new ApexCharts(document.querySelector('#bartwo'), options);
    chart.render();
  }
}
