(() => {
  'use strict';

  class App {
    constructor() {
      this.app = document.querySelector('[data-js="app"]');
      this.init();
    }
    
    init() {
      this._initEvents();
      this._getProjects();
    }

    _initEvents() {
      const $form = document.querySelector('[data-js="form"]')
      $form.addEventListener('submit', this._sendProject.bind(this), false);
    }

    _sendProject(event) {
      event.preventDefault();
      const data = new FormData(document.querySelector('[data-js="form"]'));
      fetch('http://localhost:3000/projects', {
        method: 'POST',
        body: data
      })
      .then(response => response.text())
      .then(data => {
        this._render(data);
        this._clearForm();
      });
    }

    _clearForm() {
      const $inputName = document.querySelector('[data-js="project-name"]');
      const $inputType = document.querySelector('[data-js="project-type"]');
      const $inputArchitecture = document.querySelector('[data-js="project-architecture"]');
      const $inputDev = document.querySelector('[data-js="project-dev"]');
      const $inputHmg = document.querySelector('[data-js="project-hmg"]');
      const $inputProd = document.querySelector('[data-js="project-prod"]');
      $inputName.value = '';
      $inputType.value = '';
      $inputArchitecture.value = '';
      $inputDev.value = '';
      $inputHmg.value = '';
      $inputProd.value = '';
      $inputName.focus();
    }

    _getProjects() {
      fetch('http://localhost:3000/projects')
        .then(response => response.text()
            .then(data => {
              this._render(data);
            })
        )
        .catch(error => {
          this.app.innerHTML = `<p class="error-message">Não foi possível carregar os projetos. :(</p>`
        })
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
                <li class="item"><a class="link" href="${project.environments.dev || '' }">Ambiente de Desenvolvimento</a></li>
                <li class="item"><a class="link" href="${project.environments.hmg || ''}">Ambiente de Homologação</a></li>
                <li class="item"><a class="link" href="${project.environments.prod || ''}">Ambiente de Produção</a></li>
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
})();