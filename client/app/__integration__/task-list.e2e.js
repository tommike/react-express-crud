describe('<TaskListView/>', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/task-list');
  });

  it('if tasks-view is directly opened then it doesn\'t show message "New task has been successfully created"', async () => {
    await page.waitForSelector('h1');

    const successMessage = await page.$$eval('.new-task-created', items => items.length);
    expect(successMessage).toBe(0);

    const pageContent = await page.content();
    expect(pageContent.indexOf('New task has been successfully created')).toBe(-1);
  });

  it('shows tasks in the list', async () => {
    await page.waitForSelector('h1');

    const successMessage = await page.$$eval('.tasks-list__item', items => items.length);
    expect(successMessage).toBeGreaterThan(0);
  });

  it.skip('shows "Nothing found" message if there are no tasks returned from server', async () => {
    await page.waitForSelector('h1');

    await page.evaluate(() => {
      fetch('http://localhost:5000/tasks/clear', {
        // use mock server instead
        method: 'GET',
      });
    });

    await page.waitFor(1000);

    const pageContent = await page.content();
    expect(pageContent.indexOf('No tasks found')).not.toBe(-1);
  });
});
