import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISetting, Setting } from 'app/shared/model/setting.model';
import { SettingService } from './setting.service';
import { SettingComponent } from './setting.component';
import { SettingDetailComponent } from './setting-detail.component';
import { SettingUpdateComponent } from './setting-update.component';

@Injectable({ providedIn: 'root' })
export class SettingResolve implements Resolve<ISetting> {
  constructor(private service: SettingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISetting> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((setting: HttpResponse<Setting>) => {
          if (setting.body) {
            return of(setting.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Setting());
  }
}

export const settingRoute: Routes = [
  {
    path: '',
    component: SettingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'notgen3App.setting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SettingDetailComponent,
    resolve: {
      setting: SettingResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'notgen3App.setting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SettingUpdateComponent,
    resolve: {
      setting: SettingResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'notgen3App.setting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SettingUpdateComponent,
    resolve: {
      setting: SettingResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'notgen3App.setting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
