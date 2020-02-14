import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Notgen3TestModule } from '../../../test.module';
import { InstrumentComponent } from 'app/entities/instrument/instrument.component';
import { InstrumentService } from 'app/entities/instrument/instrument.service';
import { Instrument } from 'app/shared/model/instrument.model';

describe('Component Tests', () => {
  describe('Instrument Management Component', () => {
    let comp: InstrumentComponent;
    let fixture: ComponentFixture<InstrumentComponent>;
    let service: InstrumentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [InstrumentComponent]
      })
        .overrideTemplate(InstrumentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InstrumentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InstrumentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Instrument(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.instruments && comp.instruments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
