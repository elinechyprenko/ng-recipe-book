import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFilterComponent } from './recipe-filter.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('RecipeFilterComponent', () => {
  let component: RecipeFilterComponent;
  let fixture: ComponentFixture<RecipeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFilterComponent],
      providers: [provideRouter(routes), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
