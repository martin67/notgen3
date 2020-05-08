import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Notgen3TestModule } from '../../../test.module';
import { PlayListComponent } from 'app/entities/play-list/play-list.component';
import { PlayListService } from 'app/entities/play-list/play-list.service';
import { PlayList } from 'app/shared/model/play-list.model';

describe('Component Tests', () => {
  describe('PlayList Management Component', () => {
    let comp: PlayListComponent;
    let fixture: ComponentFixture<PlayListComponent>;
    let service: PlayListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [PlayListComponent]
      })
        .overrideTemplate(PlayListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlayList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.playLists && comp.playLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
