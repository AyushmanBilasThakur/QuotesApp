import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuoteComponent } from './single-quote.component';

describe('SingleQuoteComponent', () => {
  let component: SingleQuoteComponent;
  let fixture: ComponentFixture<SingleQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
