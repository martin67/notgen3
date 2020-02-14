import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Notgen3TestModule } from '../../../test.module';
import { PlayListEntryDetailComponent } from 'app/entities/play-list-entry/play-list-entry-detail.component';
import { PlayListEntry } from 'app/shared/model/play-list-entry.model';

describe('Component Tests', () => {
  describe('PlayListEntry Management Detail Component', () => {
    let comp: PlayListEntryDetailComponent;
    let fixture: ComponentFixture<PlayListEntryDetailComponent>;
    const route = ({ data: of({ playListEntry: new PlayListEntry(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [PlayListEntryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlayListEntryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlayListEntryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load playListEntry on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playListEntry).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
