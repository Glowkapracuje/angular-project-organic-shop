import { OshopPage } from './app.po';

describe('oshop App', () => {
  let page: OshopPage;

  beforeEach(() => {
    page = new OshopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
