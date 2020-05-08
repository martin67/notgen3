import { element, by, ElementFinder } from 'protractor';

export class SettingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-setting div table .btn-danger'));
  title = element.all(by.css('jhi-setting div h2#page-heading span')).first();
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

export class SettingUpdatePage {
  pageTitle = element(by.id('jhi-setting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  instrumentSelect = element(by.id('field_instrument'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
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

export class SettingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-setting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-setting'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
