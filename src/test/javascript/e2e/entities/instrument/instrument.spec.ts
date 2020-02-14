import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InstrumentComponentsPage, InstrumentDeleteDialog, InstrumentUpdatePage } from './instrument.page-object';

const expect = chai.expect;

describe('Instrument e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let instrumentComponentsPage: InstrumentComponentsPage;
  let instrumentUpdatePage: InstrumentUpdatePage;
  let instrumentDeleteDialog: InstrumentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Instruments', async () => {
    await navBarPage.goToEntity('instrument');
    instrumentComponentsPage = new InstrumentComponentsPage();
    await browser.wait(ec.visibilityOf(instrumentComponentsPage.title), 5000);
    expect(await instrumentComponentsPage.getTitle()).to.eq('notgen3App.instrument.home.title');
    await browser.wait(ec.or(ec.visibilityOf(instrumentComponentsPage.entities), ec.visibilityOf(instrumentComponentsPage.noResult)), 1000);
  });

  it('should load create Instrument page', async () => {
    await instrumentComponentsPage.clickOnCreateButton();
    instrumentUpdatePage = new InstrumentUpdatePage();
    expect(await instrumentUpdatePage.getPageTitle()).to.eq('notgen3App.instrument.home.createOrEditLabel');
    await instrumentUpdatePage.cancel();
  });

  it('should create and save Instruments', async () => {
    const nbButtonsBeforeCreate = await instrumentComponentsPage.countDeleteButtons();

    await instrumentComponentsPage.clickOnCreateButton();

    await promise.all([instrumentUpdatePage.setNameInput('name')]);

    expect(await instrumentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await instrumentUpdatePage.save();
    expect(await instrumentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await instrumentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Instrument', async () => {
    const nbButtonsBeforeDelete = await instrumentComponentsPage.countDeleteButtons();
    await instrumentComponentsPage.clickOnLastDeleteButton();

    instrumentDeleteDialog = new InstrumentDeleteDialog();
    expect(await instrumentDeleteDialog.getDialogTitle()).to.eq('notgen3App.instrument.delete.question');
    await instrumentDeleteDialog.clickOnConfirmButton();

    expect(await instrumentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
