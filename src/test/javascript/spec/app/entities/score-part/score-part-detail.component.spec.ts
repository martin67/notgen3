import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Notgen3TestModule } from '../../../test.module';
import { ScorePartDetailComponent } from 'app/entities/score-part/score-part-detail.component';
import { ScorePart } from 'app/shared/model/score-part.model';

describe('Component Tests', () => {
  describe('ScorePart Management Detail Component', () => {
    let comp: ScorePartDetailComponent;
    let fixture: ComponentFixture<ScorePartDetailComponent>;
    const route = ({ data: of({ scorePart: new ScorePart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [ScorePartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ScorePartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ScorePartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load scorePart on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.scorePart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
