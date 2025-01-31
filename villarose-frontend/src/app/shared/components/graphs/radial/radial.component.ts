import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorData } from '../../../../core/models/sensor-data.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  labels: string[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-radial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radial.component.html',
  styleUrl: './radial.component.scss'
})
export class RadialComponent implements OnInit {
  @Input() data: SensorData[] = [];
  
  chartCircle!: ApexCharts;

  ngOnInit() {          
    var optionsCircle1 = {
      chart: {
        type: 'radialBar',
        height: 266,
        zoom: {
          enabled: false,
        },
        offsetY: 20,
      },
      colors: ['#E91E63'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: false,
            },
            enabled: false,
            value: {
              offsetY: 0,
            },
          },
        },
      },
      series: [65],
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      title: {
        text: 'Bounce Rate',
        align: 'left',
      },
    };

    this.chartCircle = new ApexCharts(document.querySelector('#radial'), optionsCircle1);
    this.chartCircle.render();
  }

  updateGraph(serie: number) {
    this.chartCircle.updateSeries([serie]);
  }
}
