import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneWithCountryComponent } from './phone-with-country.component';

describe('PhoneWithCountryComponent', () => {
  let component: PhoneWithCountryComponent;
  let fixture: ComponentFixture<PhoneWithCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneWithCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneWithCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
