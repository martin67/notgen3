import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISetting } from 'app/shared/model/setting.model';
import { SettingService } from './setting.service';
import { SettingDeleteDialogComponent } from './setting-delete-dialog.component';

@Component({
  selector: 'jhi-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit, OnDestroy {
  settings?: ISetting[];
  eventSubscriber?: Subscription;

  constructor(protected settingService: SettingService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.settingService.query().subscribe((res: HttpResponse<ISetting[]>) => (this.settings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSettings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISetting): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSettings(): void {
    this.eventSubscriber = this.eventManager.subscribe('settingListModification', () => this.loadAll());
  }

  delete(setting: ISetting): void {
    const modalRef = this.modalService.open(SettingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.setting = setting;
  }
}
