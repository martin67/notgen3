import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IScorePart, ScorePart } from 'app/shared/model/score-part.model';
import { ScorePartService } from './score-part.service';
import { IScore } from 'app/shared/model/score.model';
import { ScoreService } from 'app/entities/score/score.service';
import { IInstrument } from 'app/shared/model/instrument.model';
import { InstrumentService } from 'app/entities/instrument/instrument.service';

type SelectableEntity = IScore | IInstrument;

@Component({
  selector: 'jhi-score-part-update',
  templateUrl: './score-part-update.component.html'
})
export class ScorePartUpdateComponent implements OnInit {
  isSaving = false;
  scores: IScore[] = [];
  instruments: IInstrument[] = [];

  editForm = this.fb.group({
    id: [],
    page: [],
    length: [],
    comment: [],
    googleId: [],
    score: [],
    instrument: []
  });

  constructor(
    protected scorePartService: ScorePartService,
    protected scoreService: ScoreService,
    protected instrumentService: InstrumentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scorePart }) => {
      this.updateForm(scorePart);

      this.scoreService.query().subscribe((res: HttpResponse<IScore[]>) => (this.scores = res.body || []));

      this.instrumentService.query().subscribe((res: HttpResponse<IInstrument[]>) => (this.instruments = res.body || []));
    });
  }

  updateForm(scorePart: IScorePart): void {
    this.editForm.patchValue({
      id: scorePart.id,
      page: scorePart.page,
      length: scorePart.length,
      comment: scorePart.comment,
      googleId: scorePart.googleId,
      score: scorePart.score,
      instrument: scorePart.instrument
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const scorePart = this.createFromForm();
    if (scorePart.id !== undefined) {
      this.subscribeToSaveResponse(this.scorePartService.update(scorePart));
    } else {
      this.subscribeToSaveResponse(this.scorePartService.create(scorePart));
    }
  }

  private createFromForm(): IScorePart {
    return {
      ...new ScorePart(),
      id: this.editForm.get(['id'])!.value,
      page: this.editForm.get(['page'])!.value,
      length: this.editForm.get(['length'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      googleId: this.editForm.get(['googleId'])!.value,
      score: this.editForm.get(['score'])!.value,
      instrument: this.editForm.get(['instrument'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScorePart>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
