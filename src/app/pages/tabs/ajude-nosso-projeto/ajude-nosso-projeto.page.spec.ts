import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjudeNossoProjetoPage } from './ajude-nosso-projeto.page';

describe('AjudeNossoProjetoPage', () => {
  let component: AjudeNossoProjetoPage;
  let fixture: ComponentFixture<AjudeNossoProjetoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudeNossoProjetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
