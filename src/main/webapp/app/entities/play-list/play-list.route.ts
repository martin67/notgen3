import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlayList, PlayList } from 'app/shared/model/play-list.model';
import { PlayListService } from './play-list.service';
import { PlayListComponent } from './play-list.component';
import { PlayListDetailComponent } from './play-list-detail.component';
import { PlayListUpdateComponent } from './play-list-update.component';

@Injectable({ providedIn: 'root' })
export class PlayListResolve implements Resolve<IPlayList> {
  constructor(private service: PlayListService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlayList> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((playList: HttpResponse<PlayList>) => {
          if (playList.body) {
            return of(playList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PlayList());
  }
}

export const playListRoute: Routes = [
  {
    path: '',
    component: PlayListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlayListDetailComponent,
    resolve: {
      playList: PlayListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlayListUpdateComponent,
    resolve: {
      playList: PlayListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlayListUpdateComponent,
    resolve: {
      playList: PlayListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.playList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
