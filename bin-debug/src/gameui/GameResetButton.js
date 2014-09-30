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
        Object.defineProperty(GameResetButton.prototype, "skinParts", {
            get: function () {
                return GameResetButton._skinParts;
            },
            enumerable: true,
            configurable: true
        });

        GameResetButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.uiAsset = new egret.UIAsset();
            this.uiAsset.percentHeight = this.uiAsset.percentWidth = 100;
            this.addElement(this.uiAsset);

            this._labelDisplay = new egret.Label();
            this._labelDisplay.maxDisplayedLines = 1;
            this._labelDisplay.size = 20;
            this._labelDisplay.fontFamily = "Tahoma";
            this._labelDisplay.textColor = 0x1a1815;
            this._labelDisplay.left = 10;
            this._labelDisplay.right = 10;
            this._labelDisplay.top = 10;
            this._labelDisplay.bottom = 10;
            this._labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
            this._labelDisplay.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addElement(this._labelDisplay);
        };

        GameResetButton.prototype.commitCurrentState = function () {
            _super.prototype.commitCurrentState.call(this);
            switch (this.currentState) {
                case "up":
                    this.uiAsset.source = "button-up";
                    break;
                case "down":
                    this.uiAsset.source = "button-down";
                    break;
                case "disabled":
                    this.uiAsset.source = "button-disabled";
                    break;
            }
        };
        GameResetButton._skinParts = ["labelDisplay"];
        return GameResetButton;
    })(egret.Skin);
    gameview.GameResetButton = GameResetButton;
})(gameview || (gameview = {}));
