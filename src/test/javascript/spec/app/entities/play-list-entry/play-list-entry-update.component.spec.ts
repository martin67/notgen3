import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Notgen3TestModule } from '../../../test.module';
import { PlayListEntryUpdateComponent } from 'app/entities/play-list-entry/play-list-entry-update.component';
import { PlayListEntryService } from 'app/entities/play-list-entry/play-list-entry.service';
import { PlayListEntry } from 'app/shared/model/play-list-entry.model';

describe('Component Tests', () => {
  describe('PlayListEntry Management Update Component', () => {
    let comp: PlayListEntryUpdateComponent;
    let fixture: ComponentFixture<PlayListEntryUpdateComponent>;
    let service: PlayListEntryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [PlayListEntryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlayListEntryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayListEntryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayListEntryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlayListEntry(123);
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
        const entity = new PlayListEntry();
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
