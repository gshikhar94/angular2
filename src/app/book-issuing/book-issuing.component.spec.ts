import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssuingComponent } from './book-issuing.component';

describe('BookIssuingComponent', () => {
  let component: BookIssuingComponent;
  let fixture: ComponentFixture<BookIssuingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookIssuingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookIssuingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
