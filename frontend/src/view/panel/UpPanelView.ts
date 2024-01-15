import { UpPanelData } from "../../interface/packet";
import { ShowInfoView } from "./components/ScoreShowView";

export class UpPanelView extends HTMLElement {
  private hpView: ShowInfoView;
  private scoreView: ShowInfoView;
  constructor() {
    super();
    this.initElement();
    const upPanel = this.shadowRoot!.querySelector('#gameUpPanel') as HTMLDivElement;
    
    this.hpView = new ShowInfoView('HP');
    this.scoreView = new ShowInfoView('SCORE');
     
    upPanel.appendChild(this.hpView);
    upPanel.appendChild(this.scoreView);
  }

  private initElement() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML =
      `
      <style>
        * {
        box-sizing: content-box;
        }
        #gameUpPanel {
          padding: 0.3rem 0.5rem;
          border: black solid 1px;
          display:flex;
          flex-flow:row;
          justify-content: space-around;
        }
        
        #gameUpPanel > * {
          flex-grow: 1;
        }
      </style>
      <div id="gameUpPanel"> 
      </div>
      `;
  }
  render(data: UpPanelData) {
    if(data.hp !== undefined) this.hpView.render(`${data.hp}`);
    if(data.score !== undefined) this.scoreView.render(`${data.score}`);
  }
}

window.customElements.define('up-panel-view', UpPanelView);