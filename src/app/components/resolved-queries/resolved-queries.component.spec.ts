import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedQueriesComponent } from './resolved-queries.component';

describe('ResolvedQueriesComponent', () => {
  let component: ResolvedQueriesComponent;
  let fixture: ComponentFixture<ResolvedQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
