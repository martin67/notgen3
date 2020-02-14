import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayListEntry } from 'app/shared/model/play-list-entry.model';
import { PlayListEntryService } from './play-list-entry.service';

@Component({
  templateUrl: './play-list-entry-delete-dialog.component.html'
})
export class PlayListEntryDeleteDialogComponent {
  playListEntry?: IPlayListEntry;

  constructor(
    protected playListEntryService: PlayListEntryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.playListEntryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('playListEntryListModification');
      this.activeModal.close();
    });
  }
}
