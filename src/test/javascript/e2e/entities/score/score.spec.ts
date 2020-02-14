import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ScoreComponentsPage, ScoreDeleteDialog, ScoreUpdatePage } from './score.page-object';

const expect = chai.expect;

describe('Score e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scoreComponentsPage: ScoreComponentsPage;
  let scoreUpdatePage: ScoreUpdatePage;
  let scoreDeleteDialog: ScoreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Scores', async () => {
    await navBarPage.goToEntity('score');
    scoreComponentsPage = new ScoreComponentsPage();
    await browser.wait(ec.visibilityOf(scoreComponentsPage.title), 5000);
    expect(await scoreComponentsPage.getTitle()).to.eq('notgen3App.score.home.title');
    await browser.wait(ec.or(ec.visibilityOf(scoreComponentsPage.entities), ec.visibilityOf(scoreComponentsPage.noResult)), 1000);
  });

  it('should load create Score page', async () => {
    await scoreComponentsPage.clickOnCreateButton();
    scoreUpdatePage = new ScoreUpdatePage();
    expect(await scoreUpdatePage.getPageTitle()).to.eq('notgen3App.score.home.createOrEditLabel');
    await scoreUpdatePage.cancel();
  });

  it('should create and save Scores', async () => {
    const nbButtonsBeforeCreate = await scoreComponentsPage.countDeleteButtons();

    await scoreComponentsPage.clickOnCreateButton();

    await promise.all([scoreUpdatePage.setNameInput('name'), scoreUpdatePage.songSelectLastOption()]);

    expect(await scoreUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await scoreUpdatePage.save();
    expect(await scoreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await scoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Score', async () => {
    const nbButtonsBeforeDelete = await scoreComponentsPage.countDeleteButtons();
    await scoreComponentsPage.clickOnLastDeleteButton();

    scoreDeleteDialog = new ScoreDeleteDialog();
    expect(await scoreDeleteDialog.getDialogTitle()).to.eq('notgen3App.score.delete.question');
    await scoreDeleteDialog.clickOnConfirmButton();

    expect(await scoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
