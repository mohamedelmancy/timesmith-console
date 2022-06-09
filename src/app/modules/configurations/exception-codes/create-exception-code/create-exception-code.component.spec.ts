import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExceptionCodeComponent } from './create-exception-code.component';

describe('CreateExceptionCodeComponent', () => {
  let component: CreateExceptionCodeComponent;
  let fixture: ComponentFixture<CreateExceptionCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExceptionCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExceptionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
