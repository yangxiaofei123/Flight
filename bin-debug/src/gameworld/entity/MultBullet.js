var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by www on 2014/8/14.
*/
var gameworld;
(function (gameworld) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(params) {
            _super.call(this, params);
            this._speed = 3000;
            this._bgheight = 0;
            this.bg1 = fighter.createBitmapByName("gameworld_json." + params.textureName);
            this.textureName = params.textureName;
            this.bg1.x = -this.bg1.width >> 1;
            this.bg1.y = -this.bg1.height >> 1;
            this._bgheight = this.bg1.height;
            this.setBoundSize(this.bg1.width, this.bg1.height);
            this.addChild(this.bg1);
        }
        Bullet.prototype.update = function (a_timePassed) {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);
            //            this.updateEntityChildren(a_timePassed);
        };

        Bullet.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };

        Bullet.prototype.updatePosition = function (a_timePassed) {
            this.newPos.y -= 30;
            if (this.newPos.y <= -this._bgheight) {
                gamemain.GameScreen.m_worldEntity.removeEntityChild(this.id);

                //                gamemain.GameScreen.m_worldEntity.removeChild(this);
                this.visible = false;
                gamemain.BulletLayer.instance.reclaim(this, this.textureName);

                var b = gamemain.BulletLayer.instance.produce(this.textureName);
                var player = gameworld.PlayerPlane.instance;

                //                b.x = player.x;
                b.y = player.y;

                //                b.newPos.x = player.x;
                b.newPos.y = player.y;
                gamemain.GameScreen.m_worldEntity.addEntityChild(b);

                //            gamemain.GameScreen.m_worldEntity.addChild(b);
                b.visible = true;

                return;
            }

            this.x = this.newPos.x;
            this.y = this.newPos.y;
        };

        Bullet.prototype.clearBullet = function () {
            gamemain.GameScreen.m_worldEntity.removeEntityChild(this.id);

            //            gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.BulletLayer.instance.reclaim(this, this.textureName);
        };

        Bullet.prototype.boom = function () {
            gamemain.GameScreen.m_worldEntity.removeEntityChild(this.id);

            //                gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.BulletLayer.instance.reclaim(this, this.textureName);

            var b = gamemain.BulletLayer.instance.produce(this.textureName);
            var player = gameworld.PlayerPlane.instance;

            //            b.x = player.x;
            b.y = player.y;

            //            b.newPos.x = player.x;
            b.newPos.y = player.y;
            gamemain.GameScreen.m_worldEntity.addEntityChild(b);

            //            gamemain.GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
        };
        return Bullet;
    })(gameworld.Entity);
    gameworld.Bullet = Bullet;
})(gameworld || (gameworld = {}));
