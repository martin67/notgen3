import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayList } from 'app/shared/model/play-list.model';

@Component({
  selector: 'jhi-play-list-detail',
  templateUrl: './play-list-detail.component.html'
})
export class PlayListDetailComponent implements OnInit {
  playList: IPlayList | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playList }) => (this.playList = playList));
  }

  previousState(): void {
    window.history.back();
  }
}
