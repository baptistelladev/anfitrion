import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SugestaoPage } from './sugestao.page';

describe('SugestaoPage', () => {
  let component: SugestaoPage;
  let fixture: ComponentFixture<SugestaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SugestaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
