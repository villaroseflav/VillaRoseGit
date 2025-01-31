import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SensorData } from '../../../../core/models/sensor-data.interface';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   // labels: number[];
//   labels: string[];
//   title: ApexTitleSubtitle;
//   grid: ApexGrid;
//   dataLabels: ApexDataLabels;
// };

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent implements OnInit {
  @Input() data: SensorData[] = [];
  name = 'bar';

  ngOnInit() {
    var optionsBar = {
      chart: {
        type: 'bar',
        height: 250,
        width: '100%',
        stacked: true,
        foreColor: '#999',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false,
          },
          columnWidth: '75%',
          endingShape: 'rounded',
        },
      },
      colors: ['#00C5A4', '#F3F2FC'],
      series: [
        {
          name: 'Sessions',
          data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
        },
        {
          name: 'Views',
          data: [20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15, 19, 23],
        },
      ],
      labels: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            fontSize: '14px',
          },
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      legend: {
        floating: true,
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -36,
      },
      title: {
        text: 'Web Statistics',
        align: 'left',
      },
      subtitle: {
        text: 'Sessions and Views',
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      dataLabels: {
        enabled: false,
      },
    };

    var chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
    chartBar.render();
  }
}
