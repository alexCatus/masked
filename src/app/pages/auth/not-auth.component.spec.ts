import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthComponent } from './not-auth.component';

describe('AuthComponent', () => {
  let component: NotAuthComponent;
  let fixture: ComponentFixture<NotAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotAuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
