import { element, by, ElementFinder } from 'protractor';

export class ScorePartComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-score-part div table .btn-danger'));
  title = element.all(by.css('jhi-score-part div h2#page-heading span')).first();
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

export class ScorePartUpdatePage {
  pageTitle = element(by.id('jhi-score-part-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  pageInput = element(by.id('field_page'));
  lengthInput = element(by.id('field_length'));
  commentInput = element(by.id('field_comment'));
  googleIdInput = element(by.id('field_googleId'));

  scoreSelect = element(by.id('field_score'));
  instrumentSelect = element(by.id('field_instrument'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPageInput(page: string): Promise<void> {
    await this.pageInput.sendKeys(page);
  }

  async getPageInput(): Promise<string> {
    return await this.pageInput.getAttribute('value');
  }

  async setLengthInput(length: string): Promise<void> {
    await this.lengthInput.sendKeys(length);
  }

  async getLengthInput(): Promise<string> {
    return await this.lengthInput.getAttribute('value');
  }

  async setCommentInput(comment: string): Promise<void> {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput(): Promise<string> {
    return await this.commentInput.getAttribute('value');
  }

  async setGoogleIdInput(googleId: string): Promise<void> {
    await this.googleIdInput.sendKeys(googleId);
  }

  async getGoogleIdInput(): Promise<string> {
    return await this.googleIdInput.getAttribute('value');
  }

  async scoreSelectLastOption(): Promise<void> {
    await this.scoreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async scoreSelectOption(option: string): Promise<void> {
    await this.scoreSelect.sendKeys(option);
  }

  getScoreSelect(): ElementFinder {
    return this.scoreSelect;
  }

  async getScoreSelectedOption(): Promise<string> {
    return await this.scoreSelect.element(by.css('option:checked')).getText();
  }

  async instrumentSelectLastOption(): Promise<void> {
    await this.instrumentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async instrumentSelectOption(option: string): Promise<void> {
    await this.instrumentSelect.sendKeys(option);
  }

  getInstrumentSelect(): ElementFinder {
    return this.instrumentSelect;
  }

  async getInstrumentSelectedOption(): Promise<string> {
    return await this.instrumentSelect.element(by.css('option:checked')).getText();
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

export class ScorePartDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-scorePart-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-scorePart'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
