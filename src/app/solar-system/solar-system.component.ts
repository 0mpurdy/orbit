import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AstroBody } from '../astro-body/astro-body.component';

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements OnInit {

  time = 1;
  timeIncrement = 0;
  delay = 10;

  sun: AstroBody;
  systemData: string[] = [];
  solarSystem: SolarSystem = new SolarSystem();

  showLabels = true;
  showData = false;

  astroBodies: AstroBody[] = [];

  orbitTracker: any;
  orbitTrackerCount: number;

  constructor() { }

  ngOnInit() {
    this.updateSystemDimensions();
    this.solarSystem.scalingFactor = Math.min(this.solarSystem.height, this.solarSystem.width);
    this.solarSystem.orbitSpeedFactor = 2;
    this.sun = this.getSun(this.solarSystem);
    this.astroBodies = this.getPlanets(this.solarSystem);
    this.systemData.push(JSON.stringify(this.sun));
    this.astroBodies.forEach(element => {
      this.systemData.push(JSON.stringify(element))
    });

    this.setSunPosition();
    this.speedUpOrbit();

    // setInterval(() => {
    //   this.updateSystemDimensions();
    //   this.sun.xPosition = (this.solarSystem.width / 2) - this.sun.radius;
    //   this.sun.yPosition = (this.solarSystem.height / 2) - this.sun.radius;
    // }, 200);
  }

  changeDelay() {
    console.log('Delay changed to: ' + this.delay);
    clearInterval(this.orbitTracker);
    this.orbitTracker = setInterval(() => {
      this.time += this.timeIncrement;
    }, this.delay);
  }

  speedUpOrbit() {
    if (this.timeIncrement <= 0) {
      this.timeIncrement = 0.001;
      this.changeDelay();
    } else {
      this.timeIncrement = this.timeIncrement * 1.5;
    }
  }

  slowDownOrbit() {
    this.timeIncrement = this.timeIncrement * 0.5;
    if (this.timeIncrement < 0.001) {
      this.timeIncrement = 0;
      clearInterval(this.orbitTracker);
    }
  }

  updateSystemDimensions() {
    this.solarSystem.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    this.solarSystem.height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }

  setSunPosition() {
    this.updateSystemDimensions();
    this.sun.xPosition = (this.solarSystem.width / 2) - this.sun.radius;
    this.sun.yPosition = (this.solarSystem.height / 2) - this.sun.radius;
  }

  getSun(solarSystem: SolarSystem): AstroBody {
    return new AstroBody({
      name: "Sun",
      radius: 0.02 * solarSystem.scalingFactor,
      xPosition: (this.solarSystem.width / 2),
      yPosition: (this.solarSystem.height / 2)
    });
  }

  getPlanets(solarSystem: SolarSystem): AstroBody[] {
    return [
      new AstroBody({
        name: "Mercury",
        radius: 0.003 * solarSystem.scalingFactor,
        orbitRadius: 0.05 * solarSystem.scalingFactor,
        orbitSpeed: 1.5 * solarSystem.orbitSpeedFactor
      }),
      new AstroBody({
        name: "Earth",
        radius: 0.005 * solarSystem.scalingFactor,
        orbitRadius: 0.15 * solarSystem.scalingFactor,
        orbitSpeed: 1 * solarSystem.orbitSpeedFactor,
        satellites: [
          new AstroBody({
            name: "Moon",
            radius: 0.002 * solarSystem.scalingFactor,
            orbitRadius: 0.03 * solarSystem.scalingFactor,
            orbitSpeed: -1 * solarSystem.orbitSpeedFactor
          })
        ]
      }),
      new AstroBody({
        name: "Mars",
        radius: 0.004 * solarSystem.scalingFactor,
        orbitRadius: 0.27 * solarSystem.scalingFactor,
        orbitSpeed: 0.6 * solarSystem.orbitSpeedFactor
      }),
      new AstroBody({
        name: "Jupiter",
        radius: 0.008 * solarSystem.scalingFactor,
        orbitRadius: 0.35 * solarSystem.scalingFactor,
        orbitSpeed: 0.4 * solarSystem.orbitSpeedFactor,
        satellites: [
          new AstroBody({
            name: "Io",
            radius: 0.003 * solarSystem.scalingFactor,
            orbitRadius: 0.030 * solarSystem.scalingFactor,
            orbitSpeed: -1 * solarSystem.orbitSpeedFactor
          }),
          new AstroBody({
            name: "Ganymede",
            radius: 0.004 * solarSystem.scalingFactor,
            orbitRadius: 0.050 * solarSystem.scalingFactor,
            orbitSpeed: 1.5 * solarSystem.orbitSpeedFactor
          })
        ]
      }),
      new AstroBody({
        name: "Pluto",
        radius: 0.004 * solarSystem.scalingFactor,
        orbitRadius: 0.49 * solarSystem.scalingFactor,
        orbitSpeed: 0.2 * solarSystem.orbitSpeedFactor
      })
    ];
  }

}

export class SolarSystem {
  width: number;
  height: number;
  scalingFactor: number;
  orbitSpeedFactor: number;
}
