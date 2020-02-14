import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayListEntry } from 'app/shared/model/play-list-entry.model';

@Component({
  selector: 'jhi-play-list-entry-detail',
  templateUrl: './play-list-entry-detail.component.html'
})
export class PlayListEntryDetailComponent implements OnInit {
  playListEntry: IPlayListEntry | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playListEntry }) => (this.playListEntry = playListEntry));
  }

  previousState(): void {
    window.history.back();
  }
}
