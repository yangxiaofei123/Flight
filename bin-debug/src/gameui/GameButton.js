var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/1.
*/
var gameui;
(function (gameui) {
    var GameButton = (function (_super) {
        __extends(GameButton, _super);
        function GameButton() {
            _super.call(this);
            this.states = ["up", "down", "disabled"];
        }
        Object.defineProperty(GameButton.prototype, "skinParts", {
            get: function () {
                return GameButton._skinParts;
            },
            enumerable: true,
            configurable: true
        });

        GameButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.uiAsset = new egret.UIAsset();
            this.uiAsset.percentHeight = this.uiAsset.percentWidth = 100;
            this.addElement(this.uiAsset);

            this.labelDisplay = new egret.Label();
            this.labelDisplay.maxDisplayedLines = 1;
            this.labelDisplay.size = 20;
            this.labelDisplay.fontFamily = "Tahoma";
            this.labelDisplay.textColor = 0x1a1815;
            this.labelDisplay.left = 10;
            this.labelDisplay.right = 10;
            this.labelDisplay.top = 10;
            this.labelDisplay.bottom = 10;
            this.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
            this.labelDisplay.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addElement(this.labelDisplay);
        };

        GameButton.prototype.commitCurrentState = function () {
            _super.prototype.commitCurrentState.call(this);
            switch (this.currentState) {
                case "up":
                    this.uiAsset.source = "button-up";
                    break;
                case "down":
                    this.uiAsset.scaleX = this.uiAsset.scaleY = 1.4;
                    this.uiAsset.source = "button-down";
                    break;
                case "disabled":
                    this.uiAsset.source = "button-disabled";
                    break;
            }
        };
        GameButton._skinParts = ["labelDisplay"];
        return GameButton;
    })(egret.Skin);
    gameui.GameButton = GameButton;
})(gameui || (gameui = {}));
