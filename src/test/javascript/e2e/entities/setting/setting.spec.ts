import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SettingComponentsPage, SettingDeleteDialog, SettingUpdatePage } from './setting.page-object';

const expect = chai.expect;

describe('Setting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let settingComponentsPage: SettingComponentsPage;
  let settingUpdatePage: SettingUpdatePage;
  let settingDeleteDialog: SettingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Settings', async () => {
    await navBarPage.goToEntity('setting');
    settingComponentsPage = new SettingComponentsPage();
    await browser.wait(ec.visibilityOf(settingComponentsPage.title), 5000);
    expect(await settingComponentsPage.getTitle()).to.eq('notgen3App.setting.home.title');
    await browser.wait(ec.or(ec.visibilityOf(settingComponentsPage.entities), ec.visibilityOf(settingComponentsPage.noResult)), 1000);
  });

  it('should load create Setting page', async () => {
    await settingComponentsPage.clickOnCreateButton();
    settingUpdatePage = new SettingUpdatePage();
    expect(await settingUpdatePage.getPageTitle()).to.eq('notgen3App.setting.home.createOrEditLabel');
    await settingUpdatePage.cancel();
  });

  it('should create and save Settings', async () => {
    const nbButtonsBeforeCreate = await settingComponentsPage.countDeleteButtons();

    await settingComponentsPage.clickOnCreateButton();

    await promise.all([
      settingUpdatePage.setNameInput('name')
      // settingUpdatePage.instrumentSelectLastOption(),
    ]);

    expect(await settingUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await settingUpdatePage.save();
    expect(await settingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await settingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Setting', async () => {
    const nbButtonsBeforeDelete = await settingComponentsPage.countDeleteButtons();
    await settingComponentsPage.clickOnLastDeleteButton();

    settingDeleteDialog = new SettingDeleteDialog();
    expect(await settingDeleteDialog.getDialogTitle()).to.eq('notgen3App.setting.delete.question');
    await settingDeleteDialog.clickOnConfirmButton();

    expect(await settingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
