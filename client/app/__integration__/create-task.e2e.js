describe('<TasksForm/>', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/');
  });

  it('page title is Client', async () => {
    const title = await page.title();
    expect(title).toMatch('Client');
  });

  it.skip('input[type=text] value updates based on component state (controlled component)', async () => {
    await page.focus(
      '#tsf > div:nth-child(2) > div.A7Yvie.emca > div.zGVn2e > div > div.a4bIc > input'
    );
    await page.keyboard.type('i am typing using puppeteer !');
  });

  it.skip('<select> value updates based on component state (controlled component)', async () => {});

  it.skip('submit button is disabled by default', async () => {});

  it.skip('submit button is enabled when users fills required fields', async () => {});

  it.skip('renders prefetched countries in select/dropdown field', async () => {});

  it.skip('shows error message if country is not in countries list provided by server', async () => {});

  it.skip('page scrolls to top of window on submit if error message is shown', async () => {});

  it.skip('page redirects to /tasks-list on submit if there are no errors', async () => {});
});
