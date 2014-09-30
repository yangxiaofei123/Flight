var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/1.
*/
var gameview;
(function (gameview) {
    var GameResetButton = (function (_super) {
        __extends(GameResetButton, _super);
        function GameResetButton() {
            _super.call(this);
            this.states = ["up", "down", "disabled"];
        }
        GameResetButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.uiAsset = new egret.UIAsset();
            this.uiAsset.percentHeight = this.uiAsset.percentWidth = 100;
            this.addElement(this.uiAsset);
        };

        GameResetButton.prototype.commitCurrentState = function () {
            _super.prototype.commitCurrentState.call(this);
            switch (this.currentState) {
                case "up":
                    this.uiAsset.source = "loadingbar_02_png";
                    break;
                case "down":
                    this.uiAsset.source = "loadingbar_02_png";
                    break;
                case "disabled":
                    this.uiAsset.source = "loadingbar_02_png";
                    break;
            }
        };
        return GameResetButton;
    })(egret.Skin);
    gameview.GameResetButton = GameResetButton;
})(gameview || (gameview = {}));
