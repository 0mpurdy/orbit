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
  systemData: string[] = [];
  solarSystem: any = {};

  astroBodies: AstroBody[] = [];

  constructor() { }

  ngOnInit() {
    this.updateSystemDimensions();
    this.sun = new AstroBody({ name: "Sun", radius: 30, xPosition: (this.solarSystem.width / 2), yPosition: (this.solarSystem.height / 2) });
    this.astroBodies.push(new AstroBody({ name: "Earth", radius: 5, orbitRadius: 100 }));
    this.astroBodies[0].satellites = [new AstroBody({ name: "Moon", radius: 2, orbitRadius: 30, orbitSpeed: -1 })];
    this.astroBodies.push(new AstroBody({ name: "Jupiter", radius: 15, orbitRadius: 250, orbitSpeed: 0.4 }));
    this.astroBodies[1].satellites = [
      new AstroBody({ name: "Io", radius: 3, orbitRadius: 30, orbitSpeed: -1 }),
      new AstroBody({ name: "Ganymede", radius: 4, orbitRadius: 75, orbitSpeed: 1.5 })
    ];
    this.systemData.push(JSON.stringify(this.sun));
    this.astroBodies.forEach(element => {
      this.systemData.push(JSON.stringify(element))
    });

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
