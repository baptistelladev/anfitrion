import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobreACidadePage } from './sobre-a-cidade.page';

describe('SobreACidadePage', () => {
  let component: SobreACidadePage;
  let fixture: ComponentFixture<SobreACidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreACidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
