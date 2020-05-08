import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IScore, Score } from 'app/shared/model/score.model';
import { ScoreService } from './score.service';
import { ISong } from 'app/shared/model/song.model';
import { SongService } from 'app/entities/song/song.service';

@Component({
  selector: 'jhi-score-update',
  templateUrl: './score-update.component.html'
})
export class ScoreUpdateComponent implements OnInit {
  isSaving = false;
  songs: ISong[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    song: []
  });

  constructor(
    protected scoreService: ScoreService,
    protected songService: SongService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ score }) => {
      this.updateForm(score);

      this.songService.query().subscribe((res: HttpResponse<ISong[]>) => (this.songs = res.body || []));
    });
  }

  updateForm(score: IScore): void {
    this.editForm.patchValue({
      id: score.id,
      name: score.name,
      song: score.song
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const score = this.createFromForm();
    if (score.id !== undefined) {
      this.subscribeToSaveResponse(this.scoreService.update(score));
    } else {
      this.subscribeToSaveResponse(this.scoreService.create(score));
    }
  }

  private createFromForm(): IScore {
    return {
      ...new Score(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      song: this.editForm.get(['song'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScore>>): void {
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

  trackById(index: number, item: ISong): any {
    return item.id;
  }
}
