import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ScorePartComponentsPage, ScorePartDeleteDialog, ScorePartUpdatePage } from './score-part.page-object';

const expect = chai.expect;

describe('ScorePart e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scorePartComponentsPage: ScorePartComponentsPage;
  let scorePartUpdatePage: ScorePartUpdatePage;
  let scorePartDeleteDialog: ScorePartDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ScoreParts', async () => {
    await navBarPage.goToEntity('score-part');
    scorePartComponentsPage = new ScorePartComponentsPage();
    await browser.wait(ec.visibilityOf(scorePartComponentsPage.title), 5000);
    expect(await scorePartComponentsPage.getTitle()).to.eq('notgen3App.scorePart.home.title');
    await browser.wait(ec.or(ec.visibilityOf(scorePartComponentsPage.entities), ec.visibilityOf(scorePartComponentsPage.noResult)), 1000);
  });

  it('should load create ScorePart page', async () => {
    await scorePartComponentsPage.clickOnCreateButton();
    scorePartUpdatePage = new ScorePartUpdatePage();
    expect(await scorePartUpdatePage.getPageTitle()).to.eq('notgen3App.scorePart.home.createOrEditLabel');
    await scorePartUpdatePage.cancel();
  });

  it('should create and save ScoreParts', async () => {
    const nbButtonsBeforeCreate = await scorePartComponentsPage.countDeleteButtons();

    await scorePartComponentsPage.clickOnCreateButton();

    await promise.all([
      scorePartUpdatePage.setPageInput('5'),
      scorePartUpdatePage.setLengthInput('5'),
      scorePartUpdatePage.setCommentInput('comment'),
      scorePartUpdatePage.setGoogleIdInput('googleId'),
      scorePartUpdatePage.scoreSelectLastOption(),
      scorePartUpdatePage.instrumentSelectLastOption()
    ]);

    expect(await scorePartUpdatePage.getPageInput()).to.eq('5', 'Expected page value to be equals to 5');
    expect(await scorePartUpdatePage.getLengthInput()).to.eq('5', 'Expected length value to be equals to 5');
    expect(await scorePartUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
    expect(await scorePartUpdatePage.getGoogleIdInput()).to.eq('googleId', 'Expected GoogleId value to be equals to googleId');

    await scorePartUpdatePage.save();
    expect(await scorePartUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await scorePartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ScorePart', async () => {
    const nbButtonsBeforeDelete = await scorePartComponentsPage.countDeleteButtons();
    await scorePartComponentsPage.clickOnLastDeleteButton();

    scorePartDeleteDialog = new ScorePartDeleteDialog();
    expect(await scorePartDeleteDialog.getDialogTitle()).to.eq('notgen3App.scorePart.delete.question');
    await scorePartDeleteDialog.clickOnConfirmButton();

    expect(await scorePartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
