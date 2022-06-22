import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRolesAndPermissionsComponent } from './create-roles-and-permissions.component';

describe('CreateRolesAndPermissionsComponent', () => {
  let component: CreateRolesAndPermissionsComponent;
  let fixture: ComponentFixture<CreateRolesAndPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRolesAndPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRolesAndPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
