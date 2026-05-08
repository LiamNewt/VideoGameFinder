import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Genregamepage } from './genregamepage';

describe('Genregamepage', () => {
  let component: Genregamepage;
  let fixture: ComponentFixture<Genregamepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Genregamepage],
    }).compileComponents();

    fixture = TestBed.createComponent(Genregamepage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
