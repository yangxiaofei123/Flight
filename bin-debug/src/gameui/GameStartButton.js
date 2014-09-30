var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/1.
*/
/**
* Created by www on 2014/8/1.
*/
var gameui;
(function (gameui) {
    var GameStartButton = (function (_super) {
        __extends(GameStartButton, _super);
        function GameStartButton() {
            _super.call(this);
            this.states = ["up", "down", "disabled"];
        }
        Object.defineProperty(GameStartButton.prototype, "skinParts", {
            get: function () {
                return GameStartButton._skinParts;
            },
            enumerable: true,
            configurable: true
        });

        GameStartButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.upSkin = new egret.gui.UIAsset();
            this.upSkin.source = "imagesheet_json.bigdown";
            this.addElement(this.upSkin);

            this.downSkin = new egret.gui.UIAsset();
            this.downSkin.source = "imagesheet_json.bigdown";
            this.downSkin.scaleX = this.downSkin.scaleY = 1.1;
            this.addElement(this.downSkin);

            this.disabledSkin = new egret.gui.UIAsset();
            this.disabledSkin.source = "imagesheet_json.bigdown";
            this.addElement(this.disabledSkin);

            this.labelDisplay = new egret.gui.Label();
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

        GameStartButton.prototype.commitCurrentState = function () {
            _super.prototype.commitCurrentState.call(this);
            switch (this.currentState) {
                case "up":
                    this.upSkin.visible = true;
                    this.disabledSkin.visible = false;
                    this.downSkin.visible = false;
                    break;
                case "down":
                    this.downSkin.visible = true;
                    this.disabledSkin.visible = false;
                    this.upSkin.visible = false;
                    break;
                case "disabled":
                    this.disabledSkin.visible = true;
                    this.downSkin.visible = false;
                    this.upSkin.visible = false;
                    break;
            }
        };
        GameStartButton._skinParts = ["labelDisplay"];
        return GameStartButton;
    })(egret.gui.Skin);
    gameui.GameStartButton = GameStartButton;
    GameStartButton.prototype.__class__ = "gameui.GameStartButton";
})(gameui || (gameui = {}));
