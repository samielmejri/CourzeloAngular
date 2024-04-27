import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponentAziz } from './side-bar.component';

describe('SideBarComponentAziz', () => {
  let component: SideBarComponentAziz;
  let fixture: ComponentFixture<SideBarComponentAziz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarComponentAziz ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarComponentAziz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
