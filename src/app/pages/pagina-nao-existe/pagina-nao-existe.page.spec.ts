import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaNaoExistePage } from './pagina-nao-existe.page';

describe('PaginaNaoExistePage', () => {
  let component: PaginaNaoExistePage;
  let fixture: ComponentFixture<PaginaNaoExistePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaNaoExistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
