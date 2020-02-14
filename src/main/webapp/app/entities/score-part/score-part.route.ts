import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IScorePart, ScorePart } from 'app/shared/model/score-part.model';
import { ScorePartService } from './score-part.service';
import { ScorePartComponent } from './score-part.component';
import { ScorePartDetailComponent } from './score-part-detail.component';
import { ScorePartUpdateComponent } from './score-part-update.component';

@Injectable({ providedIn: 'root' })
export class ScorePartResolve implements Resolve<IScorePart> {
  constructor(private service: ScorePartService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IScorePart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((scorePart: HttpResponse<ScorePart>) => {
          if (scorePart.body) {
            return of(scorePart.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ScorePart());
  }
}

export const scorePartRoute: Routes = [
  {
    path: '',
    component: ScorePartComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.scorePart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ScorePartDetailComponent,
    resolve: {
      scorePart: ScorePartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.scorePart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ScorePartUpdateComponent,
    resolve: {
      scorePart: ScorePartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.scorePart.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ScorePartUpdateComponent,
    resolve: {
      scorePart: ScorePartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'notgen3App.scorePart.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
