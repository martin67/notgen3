import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlayListEntry, PlayListEntry } from 'app/shared/model/play-list-entry.model';
import { PlayListEntryService } from './play-list-entry.service';
import { PlayListEntryComponent } from './play-list-entry.component';
import { PlayListEntryDetailComponent } from './play-list-entry-detail.component';
import { PlayListEntryUpdateComponent } from './play-list-entry-update.component';

@Injectable({ providedIn: 'root' })
export class PlayListEntryResolve implements Resolve<IPlayListEntry> {
  constructor(private service: PlayListEntryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlayListEntry> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((playListEntry: HttpResponse<PlayListEntry>) => {
          if (playListEntry.body) {
            return of(playListEntry.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PlayListEntry());
  }
}

export const playListEntryRoute: Routes = [
  {
    path: '',
    component: PlayListEntryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playListEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlayListEntryDetailComponent,
    resolve: {
      playListEntry: PlayListEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playListEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlayListEntryUpdateComponent,
    resolve: {
      playListEntry: PlayListEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playListEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlayListEntryUpdateComponent,
    resolve: {
      playListEntry: PlayListEntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playListEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
