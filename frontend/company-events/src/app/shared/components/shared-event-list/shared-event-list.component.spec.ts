import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedEventListComponent } from './shared-event-list.component';

describe('SharedEventListComponent', () => {
  let component: SharedEventListComponent;
  let fixture: ComponentFixture<SharedEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedEventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
