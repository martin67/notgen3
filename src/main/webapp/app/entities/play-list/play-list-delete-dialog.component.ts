import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayList } from 'app/shared/model/play-list.model';
import { PlayListService } from './play-list.service';

@Component({
  templateUrl: './play-list-delete-dialog.component.html'
})
export class PlayListDeleteDialogComponent {
  playList?: IPlayList;

  constructor(protected playListService: PlayListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.playListService.delete(id).subscribe(() => {
      this.eventManager.broadcast('playListListModification');
      this.activeModal.close();
    });
  }
}
