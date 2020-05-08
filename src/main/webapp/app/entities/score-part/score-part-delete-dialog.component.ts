import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScorePart } from 'app/shared/model/score-part.model';
import { ScorePartService } from './score-part.service';

@Component({
  templateUrl: './score-part-delete-dialog.component.html'
})
export class ScorePartDeleteDialogComponent {
  scorePart?: IScorePart;

  constructor(protected scorePartService: ScorePartService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.scorePartService.delete(id).subscribe(() => {
      this.eventManager.broadcast('scorePartListModification');
      this.activeModal.close();
    });
  }
}
