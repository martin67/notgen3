import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SongComponentsPage, SongDeleteDialog, SongUpdatePage } from './song.page-object';

const expect = chai.expect;

describe('Song e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let songComponentsPage: SongComponentsPage;
  let songUpdatePage: SongUpdatePage;
  let songDeleteDialog: SongDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Songs', async () => {
    await navBarPage.goToEntity('song');
    songComponentsPage = new SongComponentsPage();
    await browser.wait(ec.visibilityOf(songComponentsPage.title), 5000);
    expect(await songComponentsPage.getTitle()).to.eq('notgen3App.song.home.title');
    await browser.wait(ec.or(ec.visibilityOf(songComponentsPage.entities), ec.visibilityOf(songComponentsPage.noResult)), 1000);
  });

  it('should load create Song page', async () => {
    await songComponentsPage.clickOnCreateButton();
    songUpdatePage = new SongUpdatePage();
    expect(await songUpdatePage.getPageTitle()).to.eq('notgen3App.song.home.createOrEditLabel');
    await songUpdatePage.cancel();
  });

  it('should create and save Songs', async () => {
    const nbButtonsBeforeCreate = await songComponentsPage.countDeleteButtons();

    await songComponentsPage.clickOnCreateButton();

    await promise.all([
      songUpdatePage.setTitleInput('title'),
      songUpdatePage.setSubTitleInput('subTitle'),
      songUpdatePage.setGenreInput('genre'),
      songUpdatePage.setComposerInput('composer'),
      songUpdatePage.setAuthorInput('author'),
      songUpdatePage.setArrangerInput('arranger'),
      songUpdatePage.setYearInput('5'),
      songUpdatePage.setPublisherInput('publisher')
    ]);

    expect(await songUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await songUpdatePage.getSubTitleInput()).to.eq('subTitle', 'Expected SubTitle value to be equals to subTitle');
    expect(await songUpdatePage.getGenreInput()).to.eq('genre', 'Expected Genre value to be equals to genre');
    expect(await songUpdatePage.getComposerInput()).to.eq('composer', 'Expected Composer value to be equals to composer');
    expect(await songUpdatePage.getAuthorInput()).to.eq('author', 'Expected Author value to be equals to author');
    expect(await songUpdatePage.getArrangerInput()).to.eq('arranger', 'Expected Arranger value to be equals to arranger');
    expect(await songUpdatePage.getYearInput()).to.eq('5', 'Expected year value to be equals to 5');
    expect(await songUpdatePage.getPublisherInput()).to.eq('publisher', 'Expected Publisher value to be equals to publisher');

    await songUpdatePage.save();
    expect(await songUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await songComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Song', async () => {
    const nbButtonsBeforeDelete = await songComponentsPage.countDeleteButtons();
    await songComponentsPage.clickOnLastDeleteButton();

    songDeleteDialog = new SongDeleteDialog();
    expect(await songDeleteDialog.getDialogTitle()).to.eq('notgen3App.song.delete.question');
    await songDeleteDialog.clickOnConfirmButton();

    expect(await songComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
