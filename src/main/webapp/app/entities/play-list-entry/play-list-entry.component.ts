import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlayListEntry } from 'app/shared/model/play-list-entry.model';
import { PlayListEntryService } from './play-list-entry.service';
import { PlayListEntryDeleteDialogComponent } from './play-list-entry-delete-dialog.component';

@Component({
  selector: 'jhi-play-list-entry',
  templateUrl: './play-list-entry.component.html'
})
export class PlayListEntryComponent implements OnInit, OnDestroy {
  playListEntries?: IPlayListEntry[];
  eventSubscriber?: Subscription;

  constructor(
    protected playListEntryService: PlayListEntryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.playListEntryService.query().subscribe((res: HttpResponse<IPlayListEntry[]>) => (this.playListEntries = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPlayListEntries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPlayListEntry): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPlayListEntries(): void {
    this.eventSubscriber = this.eventManager.subscribe('playListEntryListModification', () => this.loadAll());
  }

  delete(playListEntry: IPlayListEntry): void {
    const modalRef = this.modalService.open(PlayListEntryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.playListEntry = playListEntry;
  }
}
