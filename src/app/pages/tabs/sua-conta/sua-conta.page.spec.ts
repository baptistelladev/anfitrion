import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuaContaPage } from './sua-conta.page';

describe('SuaContaPage', () => {
  let component: SuaContaPage;
  let fixture: ComponentFixture<SuaContaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuaContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
