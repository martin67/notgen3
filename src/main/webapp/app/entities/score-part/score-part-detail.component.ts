import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScorePart } from 'app/shared/model/score-part.model';

@Component({
  selector: 'jhi-score-part-detail',
  templateUrl: './score-part-detail.component.html'
})
export class ScorePartDetailComponent implements OnInit {
  scorePart: IScorePart | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ scorePart }) => (this.scorePart = scorePart));
  }

  previousState(): void {
    window.history.back();
  }
}
