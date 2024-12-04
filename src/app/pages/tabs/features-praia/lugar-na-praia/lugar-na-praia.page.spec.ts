import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugarNaPraiaPage } from './lugar-na-praia.page';

describe('LugarNaPraiaPage', () => {
  let component: LugarNaPraiaPage;
  let fixture: ComponentFixture<LugarNaPraiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarNaPraiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
