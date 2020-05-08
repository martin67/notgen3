import { element, by, ElementFinder } from 'protractor';

export class PlayListEntryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-play-list-entry div table .btn-danger'));
  title = element.all(by.css('jhi-play-list-entry div h2#page-heading span')).first();
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

export class PlayListEntryUpdatePage {
  pageTitle = element(by.id('jhi-play-list-entry-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  textInput = element(by.id('field_text'));
  sortOrderInput = element(by.id('field_sortOrder'));
  boldInput = element(by.id('field_bold'));
  commentInput = element(by.id('field_comment'));
  dateInput = element(by.id('field_date'));

  playListSelect = element(by.id('field_playList'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTextInput(text: string): Promise<void> {
    await this.textInput.sendKeys(text);
  }

  async getTextInput(): Promise<string> {
    return await this.textInput.getAttribute('value');
  }

  async setSortOrderInput(sortOrder: string): Promise<void> {
    await this.sortOrderInput.sendKeys(sortOrder);
  }

  async getSortOrderInput(): Promise<string> {
    return await this.sortOrderInput.getAttribute('value');
  }

  getBoldInput(): ElementFinder {
    return this.boldInput;
  }

  async setCommentInput(comment: string): Promise<void> {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput(): Promise<string> {
    return await this.commentInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async playListSelectLastOption(): Promise<void> {
    await this.playListSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async playListSelectOption(option: string): Promise<void> {
    await this.playListSelect.sendKeys(option);
  }

  getPlayListSelect(): ElementFinder {
    return this.playListSelect;
  }

  async getPlayListSelectedOption(): Promise<string> {
    return await this.playListSelect.element(by.css('option:checked')).getText();
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

export class PlayListEntryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-playListEntry-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-playListEntry'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
