import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Notgen3TestModule } from '../../../test.module';
import { ScorePartUpdateComponent } from 'app/entities/score-part/score-part-update.component';
import { ScorePartService } from 'app/entities/score-part/score-part.service';
import { ScorePart } from 'app/shared/model/score-part.model';

describe('Component Tests', () => {
  describe('ScorePart Management Update Component', () => {
    let comp: ScorePartUpdateComponent;
    let fixture: ComponentFixture<ScorePartUpdateComponent>;
    let service: ScorePartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [ScorePartUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ScorePartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScorePartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScorePartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ScorePart(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ScorePart();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
