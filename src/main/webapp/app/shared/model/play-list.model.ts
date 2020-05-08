import { IPlayListEntry } from 'app/shared/model/play-list-entry.model';

export interface IPlayList {
  id?: number;
  name?: string;
  comment?: string;
  playListEntries?: IPlayListEntry[];
}

export class PlayList implements IPlayList {
  constructor(public id?: number, public name?: string, public comment?: string, public playListEntries?: IPlayListEntry[]) {}
}
