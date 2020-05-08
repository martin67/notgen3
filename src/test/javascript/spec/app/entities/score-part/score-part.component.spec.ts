import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Notgen3TestModule } from '../../../test.module';
import { ScorePartComponent } from 'app/entities/score-part/score-part.component';
import { ScorePartService } from 'app/entities/score-part/score-part.service';
import { ScorePart } from 'app/shared/model/score-part.model';

describe('Component Tests', () => {
  describe('ScorePart Management Component', () => {
    let comp: ScorePartComponent;
    let fixture: ComponentFixture<ScorePartComponent>;
    let service: ScorePartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [ScorePartComponent]
      })
        .overrideTemplate(ScorePartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScorePartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScorePartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ScorePart(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.scoreParts && comp.scoreParts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
