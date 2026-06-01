import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaShell } from './pwa-shell';

describe('PwaShell', () => {
  let component: PwaShell;
  let fixture: ComponentFixture<PwaShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwaShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwaShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
