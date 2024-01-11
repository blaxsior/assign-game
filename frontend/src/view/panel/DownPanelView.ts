import { DownPanelData } from "../../interface/packet";
import { BarView } from "./components/BarView";

export class DownPanelView extends HTMLElement {
  private barView: BarView;

  constructor() {    
    super();
    this.initElement();
    // shadow dom 그리기

    const panel = this.shadowRoot!.querySelector('#gameDownPanel') as HTMLDivElement;
    
    const barView = new BarView(300, -90, 90);
    this.barView = barView;
    panel.appendChild(barView);

    const fireButton = document.createElement('button');
    fireButton.textContent = 'FIRE';
    fireButton.setAttribute('id', 'fireButton');
    panel.appendChild(fireButton);
  }

  private initElement(){
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML =
      `
      <style>
        * {
        box-sizing: content-box;
        }
        #gameDownPanel {
          margin: 0;
          border: black solid 1px;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
        }
      </style>
      <div id="gameDownPanel"> 
      </div>
      `;
    
  }

  render(data: DownPanelData) {
    if(data.angle !== undefined) this.barView.render(data.angle);
  }
}

window.customElements.define('down-panel-view', DownPanelView);