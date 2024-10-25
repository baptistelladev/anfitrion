import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CidadesPage } from './cidades.page';

describe('CidadesPage', () => {
  let component: CidadesPage;
  let fixture: ComponentFixture<CidadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
