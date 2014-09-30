var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/11.
*/
var gameworld;
(function (gameworld) {
    var EnemyPlane = (function (_super) {
        __extends(EnemyPlane, _super);
        function EnemyPlane(params) {
            _super.call(this, params);
            this._speed = 300;
            this._bgheight = 0;
            this._bgwidth = 0;
            this.bg1 = fighter.createBitmapByName("gameworld1_json." + params.textureName);
            this._life = params.life;
            this._reborn = params.life;
            this.score = params.score;
            this.textureName = params.textureName;
            this._bgheight = this.bg1.height;
            this._bgwidth = this.bg1.width;
            this.bg1.x = -this.bg1.width >> 1;
            this.bg1.y = -this.bg1.height >> 1;

            //            this.bg1.scaleY = -1;
            this.setBoundSize(this.bg1.width, this.bg1.height);
            this.addChild(this.bg1);
            //            this.newPos.x = 225;
            //            this.newPos.y = fighter.GameUtil.stageH -this.bg1.height ;
        }
        Object.defineProperty(EnemyPlane.prototype, "textureWidth", {
            get: function () {
                return this._bgwidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EnemyPlane.prototype, "textureHeight", {
            get: function () {
                return this._bgheight;
            },
            enumerable: true,
            configurable: true
        });

        EnemyPlane.prototype.update = function (a_timePassed) {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);
            //            this.updateEntityChildren(a_timePassed);
        };

        EnemyPlane.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        EnemyPlane.prototype.updatePosition = function (a_timePassed) {
            this.newPos.y += this._speed * a_timePassed;
            if (this.newPos.y >= fighter.GameUtil.stageH + this._bgheight) {
                gameworld.GameWorld.instance.removeEntityChild(this.id);

                //                gamemain.GameScreen.m_worldEntity.removeChild(this);
                this.visible = false;
                gamemain.EnemyLayer.instance.reclaim(this, this.textureName);
                return;
            }

            this.x = this.newPos.x;
            this.y = this.newPos.y;
        };

        EnemyPlane.prototype.clearEnemy = function () {
            gameworld.GameWorld.instance.removeEntityChild(this.id);

            //            gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.EnemyLayer.instance.reclaim(this, this.textureName);
        };

        EnemyPlane.prototype.boom = function () {
            gameworld.GameWorld.instance.removeEntityChild(this.id);

            //                gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.EnemyLayer.instance.reclaim(this, this.textureName);
        };

        EnemyPlane.prototype.deleteLife = function (l) {
            this._life -= l;
        };

        Object.defineProperty(EnemyPlane.prototype, "life", {
            get: function () {
                return this._life;
            },
            enumerable: true,
            configurable: true
        });

        EnemyPlane.prototype.reborn = function () {
            this._life = this._reborn;
        };
        return EnemyPlane;
    })(gameworld.Entity);
    gameworld.EnemyPlane = EnemyPlane;
    EnemyPlane.prototype.__class__ = "gameworld.EnemyPlane";
})(gameworld || (gameworld = {}));
