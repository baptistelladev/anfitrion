import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BemVindoABaixadaSantistaPage } from './bem-vindo-a-baixada-santista.page';

describe('BemVindoABaixadaSantistaPage', () => {
  let component: BemVindoABaixadaSantistaPage;
  let fixture: ComponentFixture<BemVindoABaixadaSantistaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BemVindoABaixadaSantistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
