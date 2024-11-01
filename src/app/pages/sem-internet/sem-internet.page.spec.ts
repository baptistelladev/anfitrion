import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SemInternetPage } from './sem-internet.page';

describe('SemInternetPage', () => {
  let component: SemInternetPage;
  let fixture: ComponentFixture<SemInternetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SemInternetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
