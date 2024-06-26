import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ChangeDetectionStrategy, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TranslateLoaderMock} from '../../../../../shared/testing/translate-loader.mock';
import {MetadataValuesComponent} from '../../../../field-components/metadata-values/metadata-values.component';
import {ItemPageAccessibilityFieldComponent} from './item-page-accessibility-field.component';

let fixture: ComponentFixture<ItemPageAccessibilityFieldComponent>;

const mockValue = 'test value';

describe('ItemPageAccessibilityFieldComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock
        }
      })],
      declarations: [ItemPageAccessibilityFieldComponent, MetadataValuesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(ItemPageAccessibilityFieldComponent, {
      set: {changeDetection: ChangeDetectionStrategy.Default}
    }).compileComponents();
  }));

  it('should display display the correct metadata value', () => {
    expect(fixture.nativeElement.innerHTML).toContain(mockValue);
  });
});
