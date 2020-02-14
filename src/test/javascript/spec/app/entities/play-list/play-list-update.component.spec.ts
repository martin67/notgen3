import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Notgen3TestModule } from '../../../test.module';
import { PlayListUpdateComponent } from 'app/entities/play-list/play-list-update.component';
import { PlayListService } from 'app/entities/play-list/play-list.service';
import { PlayList } from 'app/shared/model/play-list.model';

describe('Component Tests', () => {
  describe('PlayList Management Update Component', () => {
    let comp: PlayListUpdateComponent;
    let fixture: ComponentFixture<PlayListUpdateComponent>;
    let service: PlayListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [PlayListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlayListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlayList(123);
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
        const entity = new PlayList();
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
