import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AstroBody } from '../astro-body/astro-body.component';

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements OnInit {

  sun: AstroBody;
  sunData: string;
  solarSystem: any = {};

  astroBodies: AstroBody[] = [];

  constructor() { }

  ngOnInit() {
    this.updateSystemDimensions();
    this.sun = new AstroBody({ name: "sun", radius: 50, xPosition: (this.solarSystem.width / 2), yPosition: (this.solarSystem.height / 2) });
    this.astroBodies.push(new AstroBody({ name: "earth", radius: 10, orbitRadius: 200 }));
    this.astroBodies[0].satellites = [new AstroBody({ name: "moon", radius: 3, orbitRadius: 50, orbitSpeed: -1 })];
    this.astroBodies.push(new AstroBody({ name: "jupiter", radius: 20, orbitRadius: 400, orbitSpeed: 0.4 }));
    this.astroBodies[1].satellites = [
      new AstroBody({ name: "io", radius: 3, orbitRadius: 50, orbitSpeed: -1 }),
      new AstroBody({ name: "ganymede", radius: 4, orbitRadius: 75, orbitSpeed: 1.5 })
    ];
    this.sunData = JSON.stringify(this.sun);

    setInterval(() => {
      this.updateSystemDimensions();
      this.sun.xPosition = (this.solarSystem.width / 2) - this.sun.radius;
      this.sun.yPosition = (this.solarSystem.height / 2) - this.sun.radius;
    }, 200);
  }

  updateSystemDimensions() {
    this.solarSystem.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    this.solarSystem.height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }

}
