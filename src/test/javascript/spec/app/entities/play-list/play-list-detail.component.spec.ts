import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Notgen3TestModule } from '../../../test.module';
import { PlayListDetailComponent } from 'app/entities/play-list/play-list-detail.component';
import { PlayList } from 'app/shared/model/play-list.model';

describe('Component Tests', () => {
  describe('PlayList Management Detail Component', () => {
    let comp: PlayListDetailComponent;
    let fixture: ComponentFixture<PlayListDetailComponent>;
    const route = ({ data: of({ playList: new PlayList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Notgen3TestModule],
        declarations: [PlayListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlayListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlayListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load playList on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
