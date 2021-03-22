import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoCharityComponent } from './do-charity.component';

describe('DoCharityComponent', () => {
  let component: DoCharityComponent;
  let fixture: ComponentFixture<DoCharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoCharityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
