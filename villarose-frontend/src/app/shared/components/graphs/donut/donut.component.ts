import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SensorData } from '../../../../core/models/sensor-data.interface';

@Component({
  selector: 'app-donut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.scss',
})
export class DonutComponent implements OnInit {
  @Input() data: SensorData[] = [];
  
  chartDonut!: ApexCharts;

// todo get window apex from material
  ngOnInit() {
    var optionsDonutTop = {
      chart: {
        height: 265,
        type: 'donut',
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          customScale: 0.86,
          donut: {
            size: '72%',
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
      colors: ['#775DD0', '#00C8E1', '#FFB900'],
      title: {
        text: 'Visitors Source',
      },
      series: [2, 7, 5],
      labels: ['Social Media', 'Blog', 'External'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false,
      },
    };

    this.chartDonut = new ApexCharts(document.querySelector('#donut'), optionsDonutTop);
    this.chartDonut.render();


    // todo
    //   // on smaller screen, change the legends position for donut
    //   var mobileDonut = function () {
    //     if ($(window).width() < 768) {
    //       donut.updateOptions(
    //         {
    //           plotOptions: {
    //             pie: {
    //               offsetY: -15,
    //             },
    //           },
    //           legend: {
    //             position: 'bottom',
    //           },
    //         },
    //         false,
    //         false,
    //       );
    //     } else {
    //       donut.updateOptions(
    //         {
    //           plotOptions: {
    //             pie: {
    //               offsetY: 20,
    //             },
    //           },
    //           legend: {
    //             position: 'left',
    //           },
    //         },
    //         false,
    //         false,
    //       );
    //     }
    //   };

    //   $(window).resize(function () {
    //     mobileDonut();
    //   });
  }

  updateGraph(x: number, y: number, z: number) {
    this.chartDonut.updateSeries([x, y, z]);
  }  
}
