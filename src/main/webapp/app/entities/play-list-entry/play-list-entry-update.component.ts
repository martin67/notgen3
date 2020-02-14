import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPlayListEntry, PlayListEntry } from 'app/shared/model/play-list-entry.model';
import { PlayListEntryService } from './play-list-entry.service';
import { IPlayList } from 'app/shared/model/play-list.model';
import { PlayListService } from 'app/entities/play-list/play-list.service';

@Component({
  selector: 'jhi-play-list-entry-update',
  templateUrl: './play-list-entry-update.component.html'
})
export class PlayListEntryUpdateComponent implements OnInit {
  isSaving = false;
  playlists: IPlayList[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    text: [],
    sortOrder: [],
    bold: [],
    comment: [],
    date: [],
    playList: []
  });

  constructor(
    protected playListEntryService: PlayListEntryService,
    protected playListService: PlayListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playListEntry }) => {
      this.updateForm(playListEntry);

      this.playListService.query().subscribe((res: HttpResponse<IPlayList[]>) => (this.playlists = res.body || []));
    });
  }

  updateForm(playListEntry: IPlayListEntry): void {
    this.editForm.patchValue({
      id: playListEntry.id,
      text: playListEntry.text,
      sortOrder: playListEntry.sortOrder,
      bold: playListEntry.bold,
      comment: playListEntry.comment,
      date: playListEntry.date,
      playList: playListEntry.playList
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const playListEntry = this.createFromForm();
    if (playListEntry.id !== undefined) {
      this.subscribeToSaveResponse(this.playListEntryService.update(playListEntry));
    } else {
      this.subscribeToSaveResponse(this.playListEntryService.create(playListEntry));
    }
  }

  private createFromForm(): IPlayListEntry {
    return {
      ...new PlayListEntry(),
      id: this.editForm.get(['id'])!.value,
      text: this.editForm.get(['text'])!.value,
      sortOrder: this.editForm.get(['sortOrder'])!.value,
      bold: this.editForm.get(['bold'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      date: this.editForm.get(['date'])!.value,
      playList: this.editForm.get(['playList'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayListEntry>>): void {
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

  trackById(index: number, item: IPlayList): any {
    return item.id;
  }
}
