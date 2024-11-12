import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificarAlteracaoDeEmailPage } from './verificar-alteracao-de-email.page';

describe('VerificarAlteracaoDeEmailPage', () => {
  let component: VerificarAlteracaoDeEmailPage;
  let fixture: ComponentFixture<VerificarAlteracaoDeEmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarAlteracaoDeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
