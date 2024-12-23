import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuaGastronomicaDeSantosPage } from './rua-gastronomica-de-santos.page';

describe('RuaGastronomicaDeSantosPage', () => {
  let component: RuaGastronomicaDeSantosPage;
  let fixture: ComponentFixture<RuaGastronomicaDeSantosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RuaGastronomicaDeSantosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
