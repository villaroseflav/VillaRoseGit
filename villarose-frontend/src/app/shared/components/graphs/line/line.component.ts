import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorData } from '../../../../core/models/sensor-data.interface';

export type Range = {
  min: number;
  max: number;
}

export type Context = {
  w: { config: { series: { data: string | any[] }[] } };
  updateOptions: (arg0: { series: { data: any }[]; subtitle: { text: string } }, arg1: boolean, arg2: boolean) => void;
};

export type Options = { el: { node: { getAttribute: (arg0: string) => string } } };

export type Data = {
    x: number;
    y: number;
  };

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent implements OnInit {
  @Input() data: SensorData[] = [];
  
  chartLine!: ApexCharts;
  series: { name: string; data: number[][] }[] = []; // todo cleaner???
  trigoStrength = 3;
  
  optionsLine!: {
    subtitle: any;
    chart?: {
      height: number;
      type: string;
      stacked: boolean;
      animations: { enabled: boolean; easing: string; dynamicAnimation: { speed: number } };
      dropShadow: { enabled: boolean; opacity: number; blur: number; left: number; top: number };
      // foreColor: '#fff', // todo light or dark
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     gradientToColors: ['#F55555', '#6078ea', '#6094ea'],
      //   },
      // },
      events: { animationEnd: (chartCtx: Context, opts: Options) => void };
      toolbar: { show: boolean };
      zoom: { enabled: boolean };
    };
    dataLabels?: { enabled: boolean };
    stroke?: { curve: string; width: number };
    grid?: { padding: { left: number; right: number }; borderColor: string };
    markers?: { size: number; hover: { size: number } };
    tooltip?: {
      theme: string; // todo dark mode
      x: {};
    };
    series?: any;
    xaxis?: { type: string; range: number; axisTicks: { color: string }; axisBorder: { color: string } };
    yaxis?: { floating: boolean; decimalsInFloat: number; opposite: boolean; labels: { offsetX: number } };
    title?: { text: string; align: string; style: { fontSize: string } };
    legend?: {
      show: boolean;
      floating: boolean;
      horizontalAlign: string;
      onItemClick: { toggleDataSeries: boolean };
      position: string;
      offsetY: number;
      offsetX: number;
    };
  };


  ngOnInit() {
    this.series = [
      {
        name: 'Running',
        data: this.generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12),
      },
      {
        name: 'Waiting',
        data: this.generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12),
      },
    ];

    this.optionsLine = {
      chart: {
        height: 350,
        type: 'line',
        stacked: true,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22,
        },
        // foreColor: '#fff', // todo light or dark
        // fill: {
        //   type: 'gradient',
        //   gradient: {
        //     gradientToColors: ['#F55555', '#6078ea', '#6094ea'],
        //   },
        // },
        events: {
          animationEnd: (chartCtx: Context, opts: Options) => {
            const newData1 = chartCtx.w.config.series[0].data.slice(1);
            const newData2 = chartCtx.w.config.series[1].data.slice(1);

            // check animation end event for just 1 series to avoid multiple updates
            if (opts.el.node.getAttribute('index') === '0') {
              window.setTimeout(() => {
                chartCtx.updateOptions(
                  {
                    series: [
                      {
                        data: newData1,
                      },
                      {
                        data: newData2,
                      },
                    ],
                    subtitle: {
                      text: this.optionsLine.subtitle.text, // (this.getRandom() * Math.random()).toString(), wtf ?? todo ??
                    },
                  },
                  false,
                  false,
                );
              }, 300);
            }
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 5,
      },
      // fill: { // todo fill or chart fill ??
      //   type: 'gradient',
      //   gradient: {
      //     gradientToColors: ['#F55555', '#6078ea', '#6094ea'],
      //   },
      // },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
        borderColor: '#40475D',
      },
      markers: {
        size: 0,
        hover: {
          size: 0,
        },
      },
      tooltip: {
        theme: 'light', // todo dark mode
        x: {
          // formatter: function (val: string) {
          //   return moment(new Date(val)).format('HH:mm:ss');
          // },
        },
      },
      series: this.series,
      xaxis: {
        type: 'datetime',
        range: 2700000,
        axisTicks: {
          color: '#333',
        },
        axisBorder: {
          color: '#333',
        },
      },
      yaxis: {
        floating: false,
        decimalsInFloat: 2,
        opposite: true,
        labels: {
          offsetX: -10,
        },
      },
      title: {
        text: 'Processes',
        align: 'left',
        style: {
          fontSize: '12px',
        },
      },
      subtitle: {
        text: '20',
        floating: true,
        align: 'right',
        offsetY: 0,
        style: {
          fontSize: '22px',
        },
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: 'left',
        onItemClick: {
          toggleDataSeries: false,
        },
        position: 'top',
        offsetY: -28,
        offsetX: 60,
      },
    };

    this.chartLine = new ApexCharts(document.querySelector('#linechart'), this.optionsLine);
    this.chartLine.render();
  }

  generateMinuteWiseTimeSeries(baseval: number, count: number) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        (Math.sin(i / this.trigoStrength) * (i / this.trigoStrength) + i / this.trigoStrength + 1) *
        (this.trigoStrength * 2);

      series.push([x, y]);
      baseval += 300000;
      i++;
    }
    return series;
  }

  updateGraph(running: number, waiting: number) {
    const updatedRunning: number[][] = [
      ...this.optionsLine.series[0].data,
      [this.getMaxX(this.optionsLine.series[0].data) + 300000, running],
    ]; //todo
    const updatedWaiting: number[][] = [
      ...this.optionsLine.series[1].data,
      [this.getMaxX(this.optionsLine.series[1].data) + 300000, waiting],
    ];

    this.optionsLine.series[0].data = updatedRunning;
    this.optionsLine.series[1].data = updatedWaiting;
    this.chartLine.updateOptions({ series: this.optionsLine.series });
  }

  // window.setInterval(() => {
  //   this.iteration++;
  //   const updatedRunning: number[][] = [...optionsLine.series[0].data, [this.getMaxX(optionsLine.series[0].data) + 300000, this.getRandom()]]; //todo
  //   const updatedWaiting: number[][] = [...optionsLine.series[1].data, [this.getMaxX(optionsLine.series[1].data) + 300000, this.getRandom()]];
  //   //this.getMaxX(optionsLine.series[0].data); //todo
  //   // console.log(
  //   //   this.generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12, {
  //   //     min: 30,
  //   //     max: 110,
  //   //   }),
  //   // );

  //   optionsLine.series[0].data = updatedRunning;
  //   optionsLine.series[1].data = updatedWaiting;
  //   // chartLine.updateSeries(optionsLine.series);
  //   chartLine.updateOptions({ series: optionsLine.series });

  //   // chartLine.updateSeries([
  //   //   {
  //   //     // data: [...chartLine.w.config.series[0].data, [chartLine.w.globals.maxX + 300000, getRandom()]],

  //   //     // data: [...optionsLine.series[0].data, [this.getMaxX(optionsLine.series[0].data) + 300000, this.getRandom()]],
  //   //     name: 'Running',
  //   //     data: updatedRunning
  //   //   },
  //   //   {
  //   //     // data: [...chartLine.w.config.series[1].data, [chartLine.w.globals.maxX + 300000, getRandom()]],
  //   //     data: [...optionsLine.series[0].data, [this.getMaxX(optionsLine.series[1].data) + 300000, this.getRandom()]],
  //   //   },
  //   // ]);
  // }, 3000);


  getMaxX(numbers: number[][]): number {
    let x = numbers[0][0];
    for (let num of numbers) {
      if (num[0] > x) x = num[0]; // todo largest x is always the last one?
    }
    return x;
  }
}