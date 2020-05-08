import { Moment } from 'moment';
import { IPlayList } from 'app/shared/model/play-list.model';

export interface IPlayListEntry {
  id?: number;
  text?: string;
  sortOrder?: number;
  bold?: boolean;
  comment?: string;
  date?: Moment;
  playList?: IPlayList;
}

export class PlayListEntry implements IPlayListEntry {
  constructor(
    public id?: number,
    public text?: string,
    public sortOrder?: number,
    public bold?: boolean,
    public comment?: string,
    public date?: Moment,
    public playList?: IPlayList
  ) {
    this.bold = this.bold || false;
  }
}
