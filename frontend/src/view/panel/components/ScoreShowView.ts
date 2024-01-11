export class ShowInfoView extends HTMLElement {
  private valueView: HTMLInputElement;

  constructor(label: string) {
    super();
    this.initElement();

    const shadow = this.shadowRoot!;
    const labelElem = shadow.querySelector('#label') as HTMLDivElement;
    labelElem.textContent = label;

    this.valueView = shadow.querySelector('#value') as HTMLInputElement;
  }

  private initElement() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML =
      `
      <style>
        #label {
          font-weight: 600;
        }
        #viewContainer {
          display: flex;
          justify-content: space-around;
        }
      </style>
      <div id="viewContainer">
        <div id='label'></div>
        <input id='value' readonly/>
      </div>
      `;
  }

  render(data: number) {
    this.valueView.value = `${data}`;
  }
}

window.customElements.define('show-info-view', ShowInfoView);