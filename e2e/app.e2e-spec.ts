import { OrbitPage } from './app.po';

describe('orbit App', () => {
  let page: OrbitPage;

  beforeEach(() => {
    page = new OrbitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
