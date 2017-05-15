import { Component, OnInit, Input } from '@angular/core';

import { SolarSystem } from '../solar-system/solar-system.component';

@Component({
  selector: 'app-astro-body',
  templateUrl: './astro-body.component.html',
  styleUrls: ['./astro-body.component.css']
})
export class AstroBodyComponent implements OnInit {

  @Input() solarSystem: SolarSystem;
  @Input() astroBody: AstroBody;
  @Input() parentBody: AstroBody;
  @Input() fixed: boolean;
  @Input() displayLabel: boolean;
  @Input() time: number;

  orbitTracker;

  constructor() { }

  ngOnInit() {

    this.setThisPosition(this.time);

  }

  ngOnChanges() {

    this.setThisPosition(this.time);
  }

  setThisPosition(time: number) {
    this.setPosition(this.astroBody, this.parentBody, time);
  }

  setPosition(astroBody: AstroBody, parentBody: AstroBody, time: number) {
    // radius * 0.5 for border width
    astroBody.xPosition = (parentBody.xPosition + parentBody.radius - (astroBody.radius * 0.5)) + (astroBody.orbitRadius * Math.cos(time * astroBody.orbitSpeed));
    astroBody.yPosition = (parentBody.yPosition + parentBody.radius - (astroBody.radius * 0.5)) + (astroBody.orbitRadius * Math.sin(time * astroBody.orbitSpeed));
  }

  startOrbit() {
    this.orbitTracker = setInterval(() => {
      this.setThisPosition(this.time);
      this.time += 0.01;
    }, 10);
  }

  stopOrbit() {
    clearInterval(this.orbitTracker);
  }

  getSpaceClass() {
    return this.astroBody.name.toLocaleLowerCase();
  }

}

export class AstroBody {
  name: string;
  radius: number;
  xPosition: number;
  yPosition: number;
  orbitRadius: number;
  orbitSpeed: number;
  satellites: AstroBody[];

  constructor(details?: {
    name?: string,
    radius?: number,
    xPosition?: number,
    yPosition?: number,
    orbitRadius?: number,
    orbitSpeed?: number,
    satellites?: AstroBody[]
  }) {
    if (details) {
      this.name = details.name;
      this.radius = details.radius;
      this.xPosition = details.xPosition;
      this.orbitRadius = details.orbitRadius;
      this.orbitSpeed = details.orbitSpeed ? details.orbitSpeed : 1;
      this.satellites = details.satellites ? details.satellites : [];
    }
  }
}