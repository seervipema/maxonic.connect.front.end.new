import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedQueriesForAllComponent } from './resolved-queries-for-all.component';

describe('ResolvedQueriesForAllComponent', () => {
  let component: ResolvedQueriesForAllComponent;
  let fixture: ComponentFixture<ResolvedQueriesForAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedQueriesForAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedQueriesForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
