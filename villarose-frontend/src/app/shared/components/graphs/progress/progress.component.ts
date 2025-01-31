import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorData } from '../../../../core/models/sensor-data.interface';

export type Range = { // todo export to external file for reuse
  min: number;
  max: number;
};

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit {
  @Input() data: SensorData[] = [];
  
  // trigoStrength = 3;
  // iteration = 11;
  chartProgress1!: ApexCharts;
  chartProgress2!: ApexCharts;
  chartProgress3!: ApexCharts;

  ngOnInit() {
    // console.log("init progress with");
    // console.log(this.p1Data);

    var optionsProgress1 = {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '20%',
          colors: {
            backgroundBarColors: ['#40475D'],
          },
        },
      },
      colors: ['#F55555'],
      stroke: {
        width: 0,
      },
      foreColor: '#fff',
      toolbar: {
        show: false,
      },
      series: [
        {
          name: 'Process 1',
          data: [44],
        },
      ],
      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Process 1',
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: '44%',
        style: {
          fontSize: '20px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Process 1'],
      },
      yaxis: {
        max: 100,
      },
      // fill: {
      //   opacity: 1,
      // },
      fill: {
        type: 'gradient',
        gradient: {
          inverseColors: false,
          gradientToColors: ['#FCCF31'],
        },
      },
    };

    this.chartProgress1 = new ApexCharts(document.querySelector('#progress1'), optionsProgress1);
    this.chartProgress1.render();

    var optionsProgress2 = {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '20%',
          colors: {
            backgroundBarColors: ['#40475D'],
          },
        },
      },
      colors: ['#17ead9'],
      stroke: {
        width: 0,
      },
      series: [
        {
          name: 'Process 2',
          data: [80],
        },
      ],
      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Process 2',
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: '80%',
        style: {
          fontSize: '20px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Process 2'],
      },
      yaxis: {
        max: 100,
      },
      fill: {
        type: 'gradient',
        gradient: {
          inverseColors: false,
          gradientToColors: ['#6078ea'],
        },
      },
    };

    this.chartProgress2 = new ApexCharts(document.querySelector('#progress2'), optionsProgress2);
    this.chartProgress2.render();

    var optionsProgress3 = {
      chart: {
        height: 70,
        type: 'bar',
        stacked: true,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '20%',
          colors: {
            backgroundBarColors: ['#40475D'],
          },
        },
      },
      colors: ['#f02fc2'],
      stroke: {
        width: 0,
      },
      series: [
        {
          name: 'Process 3',
          data: [74],
        },
      ],
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#6094ea'],
        },
      },
      title: {
        floating: true,
        offsetX: -10,
        offsetY: 5,
        text: 'Process 3',
      },
      subtitle: {
        floating: true,
        align: 'right',
        offsetY: 0,
        text: '74%',
        style: {
          fontSize: '20px',
        },
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: ['Process 3'],
      },
      yaxis: {
        max: 100,
      },
    };

    this.chartProgress3 = new ApexCharts(document.querySelector('#progress3'), optionsProgress3);
    this.chartProgress3.render();
  }

  updateGraph(data1: number, data2: number, data3: number) {
    this.chartProgress1.updateOptions({
      series: [
        {
          data: [data1],
        },
      ],
      subtitle: {
        text: data1 + '%',
      },
    });

    this.chartProgress2.updateOptions({
      series: [
        {
          data: [data2],
        },
      ],
      subtitle: {
        text: data2 + '%',
      },
    });

    this.chartProgress3.updateOptions({
      series: [
        {
          data: [data3],
        },
      ],
      subtitle: {
        text: data3 + '%',
      },
    });
  }
}
