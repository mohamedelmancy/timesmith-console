import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionCodesComponent } from './exception-codes.component';

describe('ExceptionCodesComponent', () => {
  let component: ExceptionCodesComponent;
  let fixture: ComponentFixture<ExceptionCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceptionCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
