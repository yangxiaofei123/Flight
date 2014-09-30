/**
 * Created by www on 2014/8/13.
 */
module gameworld {

    export class Ufo extends Entity {
        public textureName:string;
        private bg1:egret.Bitmap;
        private _speed:number = 300;
        private _bgheight:number= 0;
        private _bgwidth:number= 0;
        public constructor(params:gameworld.EntityParams) {
            super(params);
            this.bg1 = fighter.createBitmapByName("gameworld1_json."+params.textureName);
            this.textureName = params.textureName;
            this.bg1.x = -this.bg1.width >>1;
            this.bg1.y = -this.bg1.height >>1;
            this._bgheight = this.bg1.height;
            this._bgwidth = this.bg1.width;
            this.setBoundSize(this.bg1.width,this.bg1.height);
            this.addChild(this.bg1);
        }

        public update(a_timePassed:number):void
        {
            this.setInitialValues(a_timePassed);

            this.updatePosition(a_timePassed);

//            this.updateEntityChildren(a_timePassed);
        }
        public get textureWidth():number{
            return this._bgwidth;
        }

        public get textureHeight():number{
            return this._bgheight;
        }


        public dispose():void
        {
            super.dispose();
        }

        public updatePosition(a_timePassed:number):void
        {
            this.newPos.y+= this._speed* a_timePassed;
            if(this.newPos.y >= fighter.GameUtil.stageH+this._bgheight){
                gameworld.GameWorld.instance.removeEntityChild(this.id);
//                gamemain.GameScreen.m_worldEntity.removeChild(this);
                this.visible = false;
                return;
            }

            this.x = this.newPos.x;
            this.y = this.newPos.y;
            this.checkPosition();

        }

        public checkPosition():void
        {
            if(this.bounds.isOverlapping(gameworld.PlayerPlane.instance.bounds)){
                if(this.textureName == "ufo1"){
                    gameworld.GameWorld.instance.bulletL.changeMultFire();
                    this.boom();
                } else {
                    gameworld.GameWorld.instance.controlL.showBigBomb();
                    this.boom();
                }
            }
        }

        public clearUfo():void
        {
            this.boom();
        }

        public boom():void
        {
            gameworld.GameWorld.instance.removeEntityChild(this.id);
//                gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
        }
    }
}