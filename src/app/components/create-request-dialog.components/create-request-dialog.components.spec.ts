import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestDialogComponents } from './create-request-dialog.components';

describe('CreateRequestDialogComponents', () => {
  let component: CreateRequestDialogComponents;
  let fixture: ComponentFixture<CreateRequestDialogComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequestDialogComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequestDialogComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
