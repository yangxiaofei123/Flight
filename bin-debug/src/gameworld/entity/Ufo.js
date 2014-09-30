var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/13.
*/
var gameworld;
(function (gameworld) {
    var Ufo = (function (_super) {
        __extends(Ufo, _super);
        function Ufo(params) {
            _super.call(this, params);
            this._speed = 300;
            this._bgheight = 0;
            this._bgwidth = 0;
            this.bg1 = fighter.createBitmapByName("gameworld1_json." + params.textureName);
            this.textureName = params.textureName;
            this.bg1.x = -this.bg1.width >> 1;
            this.bg1.y = -this.bg1.height >> 1;
            this._bgheight = this.bg1.height;
            this._bgwidth = this.bg1.width;
            this.setBoundSize(this.bg1.width, this.bg1.height);
            this.addChild(this.bg1);
        }
        Ufo.prototype.update = function (a_timePassed) {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);
            //            this.updateEntityChildren(a_timePassed);
        };
        Object.defineProperty(Ufo.prototype, "textureWidth", {
            get: function () {
                return this._bgwidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Ufo.prototype, "textureHeight", {
            get: function () {
                return this._bgheight;
            },
            enumerable: true,
            configurable: true
        });

        Ufo.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };

        Ufo.prototype.updatePosition = function (a_timePassed) {
            this.newPos.y += this._speed * a_timePassed;
            if (this.newPos.y >= fighter.GameUtil.stageH + this._bgheight) {
                gameworld.GameWorld.instance.removeEntityChild(this.id);

                //                gamemain.GameScreen.m_worldEntity.removeChild(this);
                this.visible = false;
                return;
            }

            this.x = this.newPos.x;
            this.y = this.newPos.y;
            this.checkPosition();
        };

        Ufo.prototype.checkPosition = function () {
            if (this.bounds.isOverlapping(gameworld.PlayerPlane.instance.bounds)) {
                if (this.textureName == "ufo1") {
                    gameworld.GameWorld.instance.bulletL.changeMultFire();
                    this.boom();
                } else {
                    gameworld.GameWorld.instance.controlL.showBigBomb();
                    this.boom();
                }
            }
        };

        Ufo.prototype.clearUfo = function () {
            this.boom();
        };

        Ufo.prototype.boom = function () {
            gameworld.GameWorld.instance.removeEntityChild(this.id);

            //                gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
        };
        return Ufo;
    })(gameworld.Entity);
    gameworld.Ufo = Ufo;
    Ufo.prototype.__class__ = "gameworld.Ufo";
})(gameworld || (gameworld = {}));
