import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlayListComponentsPage, PlayListDeleteDialog, PlayListUpdatePage } from './play-list.page-object';

const expect = chai.expect;

describe('PlayList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playListComponentsPage: PlayListComponentsPage;
  let playListUpdatePage: PlayListUpdatePage;
  let playListDeleteDialog: PlayListDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PlayLists', async () => {
    await navBarPage.goToEntity('play-list');
    playListComponentsPage = new PlayListComponentsPage();
    await browser.wait(ec.visibilityOf(playListComponentsPage.title), 5000);
    expect(await playListComponentsPage.getTitle()).to.eq('notgen3App.playList.home.title');
    await browser.wait(ec.or(ec.visibilityOf(playListComponentsPage.entities), ec.visibilityOf(playListComponentsPage.noResult)), 1000);
  });

  it('should load create PlayList page', async () => {
    await playListComponentsPage.clickOnCreateButton();
    playListUpdatePage = new PlayListUpdatePage();
    expect(await playListUpdatePage.getPageTitle()).to.eq('notgen3App.playList.home.createOrEditLabel');
    await playListUpdatePage.cancel();
  });

  it('should create and save PlayLists', async () => {
    const nbButtonsBeforeCreate = await playListComponentsPage.countDeleteButtons();

    await playListComponentsPage.clickOnCreateButton();

    await promise.all([playListUpdatePage.setNameInput('name'), playListUpdatePage.setCommentInput('comment')]);

    expect(await playListUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await playListUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');

    await playListUpdatePage.save();
    expect(await playListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await playListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PlayList', async () => {
    const nbButtonsBeforeDelete = await playListComponentsPage.countDeleteButtons();
    await playListComponentsPage.clickOnLastDeleteButton();

    playListDeleteDialog = new PlayListDeleteDialog();
    expect(await playListDeleteDialog.getDialogTitle()).to.eq('notgen3App.playList.delete.question');
    await playListDeleteDialog.clickOnConfirmButton();

    expect(await playListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
