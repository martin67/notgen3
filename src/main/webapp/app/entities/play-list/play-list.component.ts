import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlayList } from 'app/shared/model/play-list.model';
import { PlayListService } from './play-list.service';
import { PlayListDeleteDialogComponent } from './play-list-delete-dialog.component';

@Component({
  selector: 'jhi-play-list',
  templateUrl: './play-list.component.html'
})
export class PlayListComponent implements OnInit, OnDestroy {
  playLists?: IPlayList[];
  eventSubscriber?: Subscription;

  constructor(protected playListService: PlayListService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.playListService.query().subscribe((res: HttpResponse<IPlayList[]>) => (this.playLists = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPlayLists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPlayList): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPlayLists(): void {
    this.eventSubscriber = this.eventManager.subscribe('playListListModification', () => this.loadAll());
  }

  delete(playList: IPlayList): void {
    const modalRef = this.modalService.open(PlayListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.playList = playList;
  }
}
