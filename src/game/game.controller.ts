import { Controller, Get, Render } from "@nestjs/common";

@Controller('/game')
export class GameServerController {
    @Get('/')
    @Render('index')
    getInitialGamePage() {
        return { width: 1000, height: 450 };
    }
}