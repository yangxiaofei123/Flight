/**
 * Created by www on 2014/7/31.
 */
module gamemain
{
    /**
     * 主游戏容器本质是screen   addChild 一个screen
     */
    export class GameContainer extends gameworld.Root
    {
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        /**初始化*/
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
        }

        private  resetButton:egret.gui.Button;
        private bg:egret.Bitmap;
        /**创建游戏场景*/
        private createGameScene():void{
            this.bg = fighter.createBitmapByName("imagesheet_json.ready");
            this.addChild(this.bg);
            this.bg.touchEnabled = false;

            this.resetButton = new egret.gui.Button();
            this.resetButton.skinName = gameui.GameStartButton;
            this.resetButton.width = 100;
            this.resetButton.height = 100;
            fighter.moveToCenter(this.resetButton);
            this.resetButton.label="开始";
            this.resetButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);//点击按钮开始游戏
            this.addChild(this.resetButton);



        }

        private gameStart():void{
            this.removeChild(this.bg);
            this.resetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
            this.removeChild(this.resetButton);
            super.setScreen(gamemain.GameScreen);
        }


    }
}