import { DownPanelView } from "./panel/DownPanelView";
import { UpPanelView } from "./panel/UpPanelView";
import { GameScreenView } from "./screen/GameScreenView";

import type { DownPanelData, UpPanelData, viewData } from "../interface/packet";


export class GameView {
  private upPanelView: UpPanelView;
  private gameScreenView: GameScreenView;
  private downPanelView: DownPanelView;

  constructor(rootElement: HTMLDivElement, screen_size: { width: number, height: number }) {
    const { width, height } = screen_size;

    this.upPanelView = new UpPanelView();
    this.gameScreenView = new GameScreenView(width, height);
    this.downPanelView = new DownPanelView();

    rootElement.appendChild(this.upPanelView);
    rootElement.appendChild(this.gameScreenView);
    rootElement.appendChild(this.downPanelView);
  }

  render(data: viewData) {
    const upPanelData: UpPanelData = {
      hp: data.hp,
      score: data.score
    };

    const downPanelData: DownPanelData = {
      angle: data.angle
    };

    this.upPanelView.render(upPanelData);
    this.gameScreenView.render(data.objects);
    this.downPanelView.render(downPanelData);
  }
}