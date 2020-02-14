import { element, by, ElementFinder } from 'protractor';

export class ScoreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-score div table .btn-danger'));
  title = element.all(by.css('jhi-score div h2#page-heading span')).first();
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

export class ScoreUpdatePage {
  pageTitle = element(by.id('jhi-score-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  songSelect = element(by.id('field_song'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async songSelectLastOption(): Promise<void> {
    await this.songSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async songSelectOption(option: string): Promise<void> {
    await this.songSelect.sendKeys(option);
  }

  getSongSelect(): ElementFinder {
    return this.songSelect;
  }

  async getSongSelectedOption(): Promise<string> {
    return await this.songSelect.element(by.css('option:checked')).getText();
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

export class ScoreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-score-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-score'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
