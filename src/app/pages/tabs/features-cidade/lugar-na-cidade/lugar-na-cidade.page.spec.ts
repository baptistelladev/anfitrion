import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugarNaCidadePage } from './lugar-na-cidade.page';

describe('LugarNaCidadePage', () => {
  let component: LugarNaCidadePage;
  let fixture: ComponentFixture<LugarNaCidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarNaCidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
