import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroBodyComponent } from './astro-body.component';

describe('AstroBodyComponent', () => {
  let component: AstroBodyComponent;
  let fixture: ComponentFixture<AstroBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstroBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstroBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
