import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInstrument } from 'app/shared/model/instrument.model';
import { InstrumentService } from './instrument.service';
import { InstrumentDeleteDialogComponent } from './instrument-delete-dialog.component';

@Component({
  selector: 'jhi-instrument',
  templateUrl: './instrument.component.html'
})
export class InstrumentComponent implements OnInit, OnDestroy {
  instruments?: IInstrument[];
  eventSubscriber?: Subscription;

  constructor(protected instrumentService: InstrumentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.instrumentService.query().subscribe((res: HttpResponse<IInstrument[]>) => (this.instruments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInstruments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInstrument): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInstruments(): void {
    this.eventSubscriber = this.eventManager.subscribe('instrumentListModification', () => this.loadAll());
  }

  delete(instrument: IInstrument): void {
    const modalRef = this.modalService.open(InstrumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.instrument = instrument;
  }
}
