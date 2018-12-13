describe('<TasksForm/>', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/');
  });

  it('page title is Client', async () => {
    await page.waitForSelector('form');
    const title = await page.title();
    expect(title).toMatch('Client');
  });

  it('input[type=text] value updates based on component state (controlled component)', async () => {
    const fieldInputString = 'input type text test';

    await page.waitForSelector('input[name="deliveryAt"]');
    await page.focus('input[name="deliveryAt"]');
    await page.keyboard.type(fieldInputString);

    await page.waitFor(100);
    const inputFieldValue = await page.$eval('input[name="deliveryAt"]', el => el.value);
    expect(inputFieldValue).toMatch(fieldInputString);
  });

  it('<select> value updates based on component state (controlled component)', async () => {
    const fielSelectValue = 'germany';

    await page.waitForSelector('select[name="country"]');
    await page.select('select[name="country"]', fielSelectValue);

    await page.waitFor(100);
    const selectFieldValue = await page.$eval('select[name="country"]', el => el.value);
    expect(selectFieldValue).toMatch(fielSelectValue);
  });

  it('submit button is disabled by default', async () => {
    await page.waitForSelector('button[type="submit"]');
    const disabledButtonValue = await page.$eval('button[type="submit"]', el => el.disabled);
    expect(disabledButtonValue).toBe(true);
  });

  it('submit button is enabled when users fills required fields', async () => {
    await page.waitForSelector('input[name="deliveryAt"]');

    await page.focus('input[name="deliveryAt"]');
    await page.keyboard.type('11:11:2018 11:11');

    await page.focus('input[name="name"]');
    await page.keyboard.type('name');

    await page.focus('input[name="street"]');
    await page.keyboard.type('street');

    await page.focus('input[name="city"]');
    await page.keyboard.type('city');

    await page.focus('input[name="state"]');
    await page.keyboard.type('state');

    await page.select('select[name="country"]', 'germany');

    await page.focus('input[name="zipcode"]');
    await page.keyboard.type('zipcode');

    await page.focus('input[name="phone"]');
    await page.keyboard.type('phone');

    const disabledButtonValue = await page.$eval('button[type="submit"]', el => el.disabled);
    expect(disabledButtonValue).toBe(false);
  });

  it('renders prefetched countries in select/dropdown field', async () => {
    await page.waitForSelector('select[name="country"]');
    const optionValues = await page.$$eval('select[name="country"] option', options =>
      options.map(option => option.value)
    );
    console.log(optionValues);
    const expected = ['germany', 'netherlands'];// all from this array must be appear in optionValues, it will fail if any is missing
    expect(optionValues).toEqual(expect.arrayContaining(expected));
  });

  it('shows error message if country is not in countries list provided by server', async () => {
    await page.waitForSelector('input[name="deliveryAt"]');

    await page.focus('input[name="deliveryAt"]');
    await page.keyboard.type('11:11:2018 11:11');

    await page.focus('input[name="name"]');
    await page.keyboard.type('name');

    await page.focus('input[name="street"]');
    await page.keyboard.type('street');

    await page.focus('input[name="city"]');
    await page.keyboard.type('city');

    await page.focus('input[name="state"]');
    await page.keyboard.type('state');

    await page.select('select[name="country"]', 'Austria hard coded');

    await page.focus('input[name="zipcode"]');
    await page.keyboard.type('zipcode');

    await page.focus('input[name="phone"]');
    await page.keyboard.type('phone');

    await page.click('button[type="submit"]');

    await page.waitFor(500);

    const errorShown = await page.$$eval('.form-feedback__text', items => items.length);
    expect(errorShown).toBe(1);
  });

  it('page scrolls to top of window on submit if error message is shown', async () => {
    await page.setViewport({ width: 1000, height: 500 });
    await page.waitForSelector('input[name="deliveryAt"]');

    await page.focus('input[name="deliveryAt"]');
    await page.keyboard.type('11:11:2018 11:11');

    await page.focus('input[name="name"]');
    await page.keyboard.type('name');

    await page.focus('input[name="street"]');
    await page.keyboard.type('street');

    await page.focus('input[name="city"]');
    await page.keyboard.type('city');

    await page.focus('input[name="state"]');
    await page.keyboard.type('state');

    await page.select('select[name="country"]', 'Austria hard coded');

    await page.focus('input[name="zipcode"]');
    await page.keyboard.type('zipcode');

    await page.focus('input[name="phone"]');
    await page.keyboard.type('phone');

    await page.click('button[type="submit"]');

    await page.waitFor(500);

    const errorShown = await page.$$eval('.form-feedback__text', items => items.length);
    expect(errorShown).toBe(1);

    const windowScrollOffset = await page.evaluate(() => window.scrollY);
    expect(windowScrollOffset).toBe(0);
  });

  it('page redirects to /tasks-list on submit if there are no errors', async () => {
    await page.waitForSelector('input[name="deliveryAt"]');

    await page.focus('input[name="deliveryAt"]');
    await page.keyboard.type('11:11:2018 11:11');

    await page.focus('input[name="name"]');
    await page.keyboard.type('name');

    await page.focus('input[name="street"]');
    await page.keyboard.type('street');

    await page.focus('input[name="city"]');
    await page.keyboard.type('city');

    await page.focus('input[name="state"]');
    await page.keyboard.type('state');

    await page.select('select[name="country"]', 'germany');

    await page.focus('input[name="zipcode"]');
    await page.keyboard.type('zipcode');

    await page.focus('input[name="phone"]');
    await page.keyboard.type('phone');

    await page.click('button[type="submit"]');

    await page.waitFor(500);

    const successMessage = await page.$$eval('.new-task-created', items => items.length);
    expect(successMessage).toBe(1);

    const pageContent = await page.content();
    expect(pageContent.indexOf('New task has been successfully created')).not.toBe(-1);
  });
});
