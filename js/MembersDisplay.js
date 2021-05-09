class MembersDisplay {
  static fetch() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/data/members.json', true);

      request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE) return;

        if (request.status === 200) resolve(request.responseText);
        else reject(request.status, request.statusText);
      };

      request.send();
    });
  }

  constructor(element) {
    this.element = element;
  }

  load(json) {
    Object.values(json.members).forEach((member) => {
      const uuid = member.uuid;

      const memberElement = document.createElement('div');
      memberElement.classList.add('member');

      const imageElement = document.createElement('img');
      imageElement.classList.add('member-icon');
      imageElement.src = `https://crafatar.com/avatars/${uuid}`;
      memberElement.appendChild(imageElement);

      const nameElement = document.createElement('h3');
      nameElement.classList.add('member-name');
      memberElement.appendChild(nameElement);

      Object.values(member.ranks).forEach((rankName) => {
        const rank = json.ranks[rankName];

        const rankElement = document.createElement('p');
        rankElement.innerHTML = rank.name;
        rankElement.style.color = rank.color;
        memberElement.appendChild(rankElement);
      });

      this.element.appendChild(memberElement);

      const url = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;

      const request = new XMLHttpRequest();
      request.open('GET', `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, true);

      request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE) return;
        if (request.status !== 200) return;

        const allOriginsJson = JSON.parse(request.response);
        const mojangJson = JSON.parse(allOriginsJson.contents);

        nameElement.innerHTML = mojangJson.name;
      };

      request.send();
    });
  }
}
