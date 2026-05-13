import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formresults } from './formresults';

describe('Formresults', () => {
  let component: Formresults;
  let fixture: ComponentFixture<Formresults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formresults],
    }).compileComponents();

    fixture = TestBed.createComponent(Formresults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
