import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Notgen3TestModule } from '../../../test.module';
import { SettingComponent } from 'app/entities/setting/setting.component';
import { SettingService } from 'app/entities/setting/setting.service';
import { Setting } from 'app/shared/model/setting.model';

describe('Component Tests', () => {
  describe('Setting Management Component', () => {
    let comp: SettingComponent;
    let fixture: ComponentFixture<SettingComponent>;
    let service: SettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [SettingComponent]
      })
        .overrideTemplate(SettingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SettingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SettingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Setting(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.settings && comp.settings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
