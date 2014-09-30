var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/7/31.
*/
var gamemain;
(function (gamemain) {
    /**
    * 主游戏容器本质是screen   addChild 一个screen
    */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        /**初始化*/
        GameContainer.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };

        /**创建游戏场景*/
        GameContainer.prototype.createGameScene = function () {
            this.bg = fighter.createBitmapByName("imagesheet_json.ready");
            this.addChild(this.bg);
            this.bg.touchEnabled = false;

            this.resetButton = new egret.gui.Button();
            this.resetButton.skinName = gameui.GameStartButton;
            this.resetButton.width = 100;
            this.resetButton.height = 100;
            fighter.moveToCenter(this.resetButton);
            this.resetButton.label = "开始";
            this.resetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this); //点击按钮开始游戏
            this.addChild(this.resetButton);
        };

        GameContainer.prototype.gameStart = function () {
            this.removeChild(this.bg);
            this.resetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.removeChild(this.resetButton);
            _super.prototype.setScreen.call(this, gamemain.GameScreen);
        };
        return GameContainer;
    })(gameworld.Root);
    gamemain.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "gamemain.GameContainer";
})(gamemain || (gamemain = {}));
