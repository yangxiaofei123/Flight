/**
 * Created by www on 2014/8/8.
 */
module gameworld {

    export class Bullet extends Entity {
        public textureName:string;
        private bg1:egret.Bitmap;
        private bg2:egret.Bitmap;
        private _speed:number = 3000;
        private _bgheight:number= 0;
        public power:number;
        public constructor(params:gameworld.EntityParams) {
            super(params);
            if (params.textureName == "bullet2") {
                this.bg1 = fighter.createBitmapByName("gameworld_json." + params.textureName);
                this.textureName = params.textureName;
                this.bg1.x = -(this.bg1.width >> 1)-30;
                this.bg1.y = -(this.bg1.height >> 1);
                this._bgheight = this.bg1.height;
//                this.setBoundSize(this.bg1.width, this.bg1.height);
                this.addChild(this.bg1);

                this.bg2 = fighter.createBitmapByName("gameworld_json." + params.textureName);
                this.textureName = params.textureName;
                this.bg2.x = -(this.bg2.width >> 1)+30;
                this.bg2.y = -this.bg2.height >> 1;
                this._bgheight = this.bg2.height;
                this.setBoundSize(this.bg2.width+60, this.bg2.height);
                this.addChild(this.bg2);
                this.power = 2;
            } else {
                this.bg1 = fighter.createBitmapByName("gameworld_json." + params.textureName);
                this.textureName = params.textureName;
                this.bg1.x = -this.bg1.width >> 1;
                this.bg1.y = -this.bg1.height >> 1;
                this._bgheight = this.bg1.height;
                this.setBoundSize(this.bg1.width, this.bg1.height);
                this.addChild(this.bg1);
                this.power = 1;
            }
        }

        public update(a_timePassed:number):void
        {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);

//            this.updateEntityChildren(a_timePassed);
        }

        public dispose():void
        {
            super.dispose();
        }

        public updatePosition(a_timePassed:number):void
        {
            this.newPos.y-= 60;
            if(this.newPos.y <= -this._bgheight){
                this.boom();
                return;
            }
            this.x = this.newPos.x;
            this.y = this.newPos.y;
        }

        public clearBullet():void
        {
            gameworld.GameWorld.instance.removeEntityChild(this.id);
//            gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.BulletLayer.instance.reclaim(this,this.textureName);
        }

        public boom():void
        {
            gameworld.GameWorld.instance.removeEntityChild(this.id);
//                gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.BulletLayer.instance.reclaim(this,this.textureName);

            var b:gameworld.Bullet = gamemain.BulletLayer.instance.produce(this.textureName);
            var player:any = gameworld.PlayerPlane.instance;

            b.x = player.x;
            b.y = player.y- 60;
            b.newPos.x = player.x;
            b.newPos.y = player.y-60;
            gameworld.GameWorld.instance.addEntityChild(b);
//            gamemain.GameScreen.m_worldEntity.addChild(b);
            b.visible = true;
        }
    }
}

