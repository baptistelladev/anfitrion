import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuemSomosPage } from './quem-somos.page';

describe('QuemSomosPage', () => {
  let component: QuemSomosPage;
  let fixture: ComponentFixture<QuemSomosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuemSomosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
