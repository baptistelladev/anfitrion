import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugaresNaCidadePage } from './lugares-na-cidade.page';

describe('LugaresNaCidadePage', () => {
  let component: LugaresNaCidadePage;
  let fixture: ComponentFixture<LugaresNaCidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LugaresNaCidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
