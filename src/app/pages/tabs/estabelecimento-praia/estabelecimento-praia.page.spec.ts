import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstabelecimentoPraiaPage } from './estabelecimento-praia.page';

describe('EstabelecimentoPraiaPage', () => {
  let component: EstabelecimentoPraiaPage;
  let fixture: ComponentFixture<EstabelecimentoPraiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoPraiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
