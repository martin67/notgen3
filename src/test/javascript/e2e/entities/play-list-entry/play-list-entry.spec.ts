import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlayListEntryComponentsPage, PlayListEntryDeleteDialog, PlayListEntryUpdatePage } from './play-list-entry.page-object';

const expect = chai.expect;

describe('PlayListEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playListEntryComponentsPage: PlayListEntryComponentsPage;
  let playListEntryUpdatePage: PlayListEntryUpdatePage;
  let playListEntryDeleteDialog: PlayListEntryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PlayListEntries', async () => {
    await navBarPage.goToEntity('play-list-entry');
    playListEntryComponentsPage = new PlayListEntryComponentsPage();
    await browser.wait(ec.visibilityOf(playListEntryComponentsPage.title), 5000);
    expect(await playListEntryComponentsPage.getTitle()).to.eq('notgen3App.playListEntry.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(playListEntryComponentsPage.entities), ec.visibilityOf(playListEntryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PlayListEntry page', async () => {
    await playListEntryComponentsPage.clickOnCreateButton();
    playListEntryUpdatePage = new PlayListEntryUpdatePage();
    expect(await playListEntryUpdatePage.getPageTitle()).to.eq('notgen3App.playListEntry.home.createOrEditLabel');
    await playListEntryUpdatePage.cancel();
  });

  it('should create and save PlayListEntries', async () => {
    const nbButtonsBeforeCreate = await playListEntryComponentsPage.countDeleteButtons();

    await playListEntryComponentsPage.clickOnCreateButton();

    await promise.all([
      playListEntryUpdatePage.setTextInput('text'),
      playListEntryUpdatePage.setSortOrderInput('5'),
      playListEntryUpdatePage.setCommentInput('comment'),
      playListEntryUpdatePage.setDateInput('2000-12-31'),
      playListEntryUpdatePage.playListSelectLastOption()
    ]);

    expect(await playListEntryUpdatePage.getTextInput()).to.eq('text', 'Expected Text value to be equals to text');
    expect(await playListEntryUpdatePage.getSortOrderInput()).to.eq('5', 'Expected sortOrder value to be equals to 5');
    const selectedBold = playListEntryUpdatePage.getBoldInput();
    if (await selectedBold.isSelected()) {
      await playListEntryUpdatePage.getBoldInput().click();
      expect(await playListEntryUpdatePage.getBoldInput().isSelected(), 'Expected bold not to be selected').to.be.false;
    } else {
      await playListEntryUpdatePage.getBoldInput().click();
      expect(await playListEntryUpdatePage.getBoldInput().isSelected(), 'Expected bold to be selected').to.be.true;
    }
    expect(await playListEntryUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
    expect(await playListEntryUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');

    await playListEntryUpdatePage.save();
    expect(await playListEntryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await playListEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PlayListEntry', async () => {
    const nbButtonsBeforeDelete = await playListEntryComponentsPage.countDeleteButtons();
    await playListEntryComponentsPage.clickOnLastDeleteButton();

    playListEntryDeleteDialog = new PlayListEntryDeleteDialog();
    expect(await playListEntryDeleteDialog.getDialogTitle()).to.eq('notgen3App.playListEntry.delete.question');
    await playListEntryDeleteDialog.clickOnConfirmButton();

    expect(await playListEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
