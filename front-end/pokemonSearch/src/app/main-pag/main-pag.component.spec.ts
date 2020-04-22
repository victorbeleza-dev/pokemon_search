import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPagComponent } from './main-pag.component';

describe('MainPagComponent', () => {
  let component: MainPagComponent;
  let fixture: ComponentFixture<MainPagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
