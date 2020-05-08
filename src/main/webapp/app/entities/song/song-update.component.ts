import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISong, Song } from 'app/shared/model/song.model';
import { SongService } from './song.service';

@Component({
  selector: 'jhi-song-update',
  templateUrl: './song-update.component.html'
})
export class SongUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    subTitle: [],
    genre: [],
    composer: [],
    author: [],
    arranger: [],
    year: [],
    publisher: []
  });

  constructor(protected songService: SongService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ song }) => {
      this.updateForm(song);
    });
  }

  updateForm(song: ISong): void {
    this.editForm.patchValue({
      id: song.id,
      title: song.title,
      subTitle: song.subTitle,
      genre: song.genre,
      composer: song.composer,
      author: song.author,
      arranger: song.arranger,
      year: song.year,
      publisher: song.publisher
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const song = this.createFromForm();
    if (song.id !== undefined) {
      this.subscribeToSaveResponse(this.songService.update(song));
    } else {
      this.subscribeToSaveResponse(this.songService.create(song));
    }
  }

  private createFromForm(): ISong {
    return {
      ...new Song(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      subTitle: this.editForm.get(['subTitle'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      composer: this.editForm.get(['composer'])!.value,
      author: this.editForm.get(['author'])!.value,
      arranger: this.editForm.get(['arranger'])!.value,
      year: this.editForm.get(['year'])!.value,
      publisher: this.editForm.get(['publisher'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISong>>): void {
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
