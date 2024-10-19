import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrocarIdiomaPage } from './trocar-idioma.page';

describe('TrocarIdiomaPage', () => {
  let component: TrocarIdiomaPage;
  let fixture: ComponentFixture<TrocarIdiomaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocarIdiomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
