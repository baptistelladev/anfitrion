import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SugestoesDoAnfitriaoPage } from './sugestoes-do-anfitriao.page';

describe('SugestoesDoAnfitriaoPage', () => {
  let component: SugestoesDoAnfitriaoPage;
  let fixture: ComponentFixture<SugestoesDoAnfitriaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SugestoesDoAnfitriaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
