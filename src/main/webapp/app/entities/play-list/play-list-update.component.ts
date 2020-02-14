import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPlayList, PlayList } from 'app/shared/model/play-list.model';
import { PlayListService } from './play-list.service';

@Component({
  selector: 'jhi-play-list-update',
  templateUrl: './play-list-update.component.html'
})
export class PlayListUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    comment: []
  });

  constructor(protected playListService: PlayListService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playList }) => {
      this.updateForm(playList);
    });
  }

  updateForm(playList: IPlayList): void {
    this.editForm.patchValue({
      id: playList.id,
      name: playList.name,
      comment: playList.comment
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const playList = this.createFromForm();
    if (playList.id !== undefined) {
      this.subscribeToSaveResponse(this.playListService.update(playList));
    } else {
      this.subscribeToSaveResponse(this.playListService.create(playList));
    }
  }

  private createFromForm(): IPlayList {
    return {
      ...new PlayList(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      comment: this.editForm.get(['comment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayList>>): void {
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
}
