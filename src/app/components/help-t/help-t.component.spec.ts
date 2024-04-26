import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTComponent } from './help-t.component';

describe('HelpTComponent', () => {
  let component: HelpTComponent;
  let fixture: ComponentFixture<HelpTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
