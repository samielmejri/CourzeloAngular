import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoursComponent } from './delete-cours.component';

describe('DeleteCoursComponent', () => {
  let component: DeleteCoursComponent;
  let fixture: ComponentFixture<DeleteCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
