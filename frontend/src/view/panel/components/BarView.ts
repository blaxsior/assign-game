export class BarView extends HTMLElement {
  private barWidth: number;
  private base: number;
  private length: number;
  // BarView 내부에서 처리하는 요소들
  private arrow: HTMLDivElement;
  private text: HTMLInputElement;

  constructor(width: number, from: number, to: number) {
    super();
    this.initElement(width);

    this.barWidth = width;
    this.base = - from;
    this.length = to - from;
    const shadow = this.shadowRoot!;

    this.arrow = shadow.querySelector('#arrow') as HTMLDivElement;
    this.text = shadow.querySelector('#bar-text') as HTMLInputElement;
    

  }

  private initElement(width: number) {
    // shadow dom 그리기
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = 
    `
    <style>
      #bar-container {
        display: flex;
        flex-flow: column;
        gap: 0.25rem;
      }
      #bar {
        position: relative;
        width: ${width}px;
        height: 20px;
        background-color: #ddd;
        display
      }
      #bar > * {
        margin: 0 auto;
      }
      #bar-text {
          text-align:center;
          margin: 0 auto;
      }
      #arrow {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 20px solid blue;
          position: absolute;
          /* 삼각형 위치 */
          top: -10px;
          /* 중심 조절 */
          transform: translateX(-50%);
      }
    </style>
    <div id="bar-container">
      <div id="bar">
        <div id="arrow"></div>
        <span style="float:left;">A</span>
        <span style="float:right;">D</span>
      </div>
      <input id="bar-text" value="0" readonly></input>
    </div>    
    `;
  }

  render(value: number) {
    const position = (value + this.base) / this.length * this.barWidth;
    this.arrow.style.left = position + 'px';
    this.text.value = `${value}`;
  }
}

window.customElements.define('bar-view', BarView);