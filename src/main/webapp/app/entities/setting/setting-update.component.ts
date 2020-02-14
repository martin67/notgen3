import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISetting, Setting } from 'app/shared/model/setting.model';
import { SettingService } from './setting.service';
import { IInstrument } from 'app/shared/model/instrument.model';
import { InstrumentService } from 'app/entities/instrument/instrument.service';

@Component({
  selector: 'jhi-setting-update',
  templateUrl: './setting-update.component.html'
})
export class SettingUpdateComponent implements OnInit {
  isSaving = false;
  instruments: IInstrument[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    instruments: []
  });

  constructor(
    protected settingService: SettingService,
    protected instrumentService: InstrumentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ setting }) => {
      this.updateForm(setting);

      this.instrumentService.query().subscribe((res: HttpResponse<IInstrument[]>) => (this.instruments = res.body || []));
    });
  }

  updateForm(setting: ISetting): void {
    this.editForm.patchValue({
      id: setting.id,
      name: setting.name,
      instruments: setting.instruments
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const setting = this.createFromForm();
    if (setting.id !== undefined) {
      this.subscribeToSaveResponse(this.settingService.update(setting));
    } else {
      this.subscribeToSaveResponse(this.settingService.create(setting));
    }
  }

  private createFromForm(): ISetting {
    return {
      ...new Setting(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      instruments: this.editForm.get(['instruments'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISetting>>): void {
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

  trackById(index: number, item: IInstrument): any {
    return item.id;
  }

  getSelected(selectedVals: IInstrument[], option: IInstrument): IInstrument {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
