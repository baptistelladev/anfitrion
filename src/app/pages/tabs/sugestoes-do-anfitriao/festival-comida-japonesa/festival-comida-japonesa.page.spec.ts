import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalComidaJaponesaPage } from './festival-comida-japonesa.page';

describe('FestivalComidaJaponesaPage', () => {
  let component: FestivalComidaJaponesaPage;
  let fixture: ComponentFixture<FestivalComidaJaponesaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalComidaJaponesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
