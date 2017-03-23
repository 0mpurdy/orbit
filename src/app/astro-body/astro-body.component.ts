import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-astro-body',
  templateUrl: './astro-body.component.html',
  styleUrls: ['./astro-body.component.css']
})
export class AstroBodyComponent implements OnInit {

  @Input() astroBody: AstroBody;
  @Input() parentBody: AstroBody;
  @Input() fixed: boolean;
  @Input() displayLabel: boolean;

  time = 0;

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.astroBody.xPosition = (this.parentBody.xPosition + this.parentBody.radius - this.astroBody.radius) + (this.astroBody.orbitRadius * Math.cos(this.time * this.astroBody.orbitSpeed));
      this.astroBody.yPosition = (this.parentBody.yPosition + this.parentBody.radius - this.astroBody.radius) + (this.astroBody.orbitRadius * Math.sin(this.time * this.astroBody.orbitSpeed));
      this.time += 0.01;
    }, 10);

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
  satellites: AstroBody[];
  orbitSpeed: number;

  constructor(details?: {
    name?: string,
    radius?: number,
    xPosition?: number,
    yPosition?: number,
    orbitRadius?: number,
    orbitSpeed?: number
  }) {
    if (details) {
      this.name = details.name;
      this.radius = details.radius;
      this.xPosition = details.xPosition;
      this.orbitRadius = details.orbitRadius;
      this.orbitSpeed = details.orbitSpeed ? details.orbitSpeed : 1;
    }
  }
}