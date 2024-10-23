import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeusDadosPage } from './seus-dados.page';

describe('SeusDadosPage', () => {
  let component: SeusDadosPage;
  let fixture: ComponentFixture<SeusDadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeusDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
