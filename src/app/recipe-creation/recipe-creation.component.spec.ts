import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreationComponent } from './recipe-creation.component';
import { provideHttpClient } from '@angular/common/http';

describe('RecipeCreationComponent', () => {
  let component: RecipeCreationComponent;
  let fixture: ComponentFixture<RecipeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCreationComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
