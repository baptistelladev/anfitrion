import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcoesPage } from './acoes.page';

describe('AcoesPage', () => {
  let component: AcoesPage;
  let fixture: ComponentFixture<AcoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
