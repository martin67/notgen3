import { element, by, ElementFinder } from 'protractor';

export class SongComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-song div table .btn-danger'));
  title = element.all(by.css('jhi-song div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SongUpdatePage {
  pageTitle = element(by.id('jhi-song-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  subTitleInput = element(by.id('field_subTitle'));
  genreInput = element(by.id('field_genre'));
  composerInput = element(by.id('field_composer'));
  authorInput = element(by.id('field_author'));
  arrangerInput = element(by.id('field_arranger'));
  yearInput = element(by.id('field_year'));
  publisherInput = element(by.id('field_publisher'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setSubTitleInput(subTitle: string): Promise<void> {
    await this.subTitleInput.sendKeys(subTitle);
  }

  async getSubTitleInput(): Promise<string> {
    return await this.subTitleInput.getAttribute('value');
  }

  async setGenreInput(genre: string): Promise<void> {
    await this.genreInput.sendKeys(genre);
  }

  async getGenreInput(): Promise<string> {
    return await this.genreInput.getAttribute('value');
  }

  async setComposerInput(composer: string): Promise<void> {
    await this.composerInput.sendKeys(composer);
  }

  async getComposerInput(): Promise<string> {
    return await this.composerInput.getAttribute('value');
  }

  async setAuthorInput(author: string): Promise<void> {
    await this.authorInput.sendKeys(author);
  }

  async getAuthorInput(): Promise<string> {
    return await this.authorInput.getAttribute('value');
  }

  async setArrangerInput(arranger: string): Promise<void> {
    await this.arrangerInput.sendKeys(arranger);
  }

  async getArrangerInput(): Promise<string> {
    return await this.arrangerInput.getAttribute('value');
  }

  async setYearInput(year: string): Promise<void> {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput(): Promise<string> {
    return await this.yearInput.getAttribute('value');
  }

  async setPublisherInput(publisher: string): Promise<void> {
    await this.publisherInput.sendKeys(publisher);
  }

  async getPublisherInput(): Promise<string> {
    return await this.publisherInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SongDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-song-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-song'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
