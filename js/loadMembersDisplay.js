promise = MembersDisplay.fetch();

document.addEventListener('DOMContentLoaded', async () => {
  const response = await promise;
  const json = JSON.parse(response);

  const elements = document.getElementsByClassName('team-members');

  Object.values(elements).forEach((element) => {
    const display = new MembersDisplay(element);
    display.load(json);
  });
});
