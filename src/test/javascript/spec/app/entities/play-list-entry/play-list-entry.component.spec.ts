import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Notgen3TestModule } from '../../../test.module';
import { PlayListEntryComponent } from 'app/entities/play-list-entry/play-list-entry.component';
import { PlayListEntryService } from 'app/entities/play-list-entry/play-list-entry.service';
import { PlayListEntry } from 'app/shared/model/play-list-entry.model';

describe('Component Tests', () => {
  describe('PlayListEntry Management Component', () => {
    let comp: PlayListEntryComponent;
    let fixture: ComponentFixture<PlayListEntryComponent>;
    let service: PlayListEntryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [PlayListEntryComponent]
      })
        .overrideTemplate(PlayListEntryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayListEntryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayListEntryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlayListEntry(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.playListEntries && comp.playListEntries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
