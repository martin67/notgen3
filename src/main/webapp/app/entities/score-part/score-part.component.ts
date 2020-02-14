import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IScorePart } from 'app/shared/model/score-part.model';
import { ScorePartService } from './score-part.service';
import { ScorePartDeleteDialogComponent } from './score-part-delete-dialog.component';

@Component({
  selector: 'jhi-score-part',
  templateUrl: './score-part.component.html'
})
export class ScorePartComponent implements OnInit, OnDestroy {
  scoreParts?: IScorePart[];
  eventSubscriber?: Subscription;

  constructor(protected scorePartService: ScorePartService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.scorePartService.query().subscribe((res: HttpResponse<IScorePart[]>) => (this.scoreParts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInScoreParts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IScorePart): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInScoreParts(): void {
    this.eventSubscriber = this.eventManager.subscribe('scorePartListModification', () => this.loadAll());
  }

  delete(scorePart: IScorePart): void {
    const modalRef = this.modalService.open(ScorePartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.scorePart = scorePart;
  }
}
