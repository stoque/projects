(() => {
  'use strict';

  class App {
    init() {
      this.app = document.querySelector('[data-js="app"]');
      this._getProjects();
    }

    _getProjects() {
      fetch('http://localhost:3000/projects')
        .then(response => response.text()
            .then(data => {
              this._render(data);
            })
        )
    }

    _render(data) {
      const projects = JSON.parse(data);
      const projectsMarkup = `
        <div class="projects-wrapper">
          ${projects.map(project => 
            `
            <div class="project">
              <h2 class="name">${project.name}</h2>
              <p class="type -${project.type.toLowerCase()}">${project.type}</p>
              <p class="architecture">Arquitetura: <strong>${project.architecture}</strong></p>
              <ul class="environments-list">
                <li class="item"><a class="link" href="${project.environments.dev}">Ambiente de Desenvolvimento</a></li>
                <li class="item"><a class="link" href="${project.environments.hmg}">Ambiente de Homologação</a></li>
                <li class="item"><a class="link" href="${project.environments.prod}">Ambiente de Produção</a></li>
              </ul>
            </div>
            `
            ).join('')
          }
        </div>`
      this.app.innerHTML = projectsMarkup;
    }
  }

  const app = new App;
  app.init();
})();