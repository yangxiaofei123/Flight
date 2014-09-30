/**
 * Created by www on 2014/8/11.
 */
module gameworld {

    export class EnemyPlane extends  Entity{
        public textureName:string;
        private bg1:egret.Bitmap;
        public _speed:number = 300;
        private _life:number;
        private _reborn:number;
        public score:number;
        private _bgheight:number= 0;
        private _bgwidth:number= 0;
        public constructor(params:gameworld.EntityParams) {

            super(params);
            this.bg1 = fighter.createBitmapByName("gameworld1_json."+params.textureName);
            this._life = params.life;
            this._reborn = params.life;
            this.score = params.score;
            this.textureName = params.textureName;
            this._bgheight= this.bg1.height;
            this._bgwidth = this.bg1.width;
            this.bg1.x = -this.bg1.width>>1;
            this.bg1.y = -this.bg1.height>>1;
//            this.bg1.scaleY = -1;
            this.setBoundSize(this.bg1.width,this.bg1.height);
            this.addChild(this.bg1);
//            this.newPos.x = 225;
//            this.newPos.y = fighter.GameUtil.stageH -this.bg1.height ;
        }

        public get textureWidth():number{
            return this._bgwidth;
        }

        public get textureHeight():number{
            return this._bgheight;
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
            this.newPos.y+= this._speed* a_timePassed;
            if(this.newPos.y >= fighter.GameUtil.stageH+this._bgheight){
                gameworld.GameWorld.instance.removeEntityChild(this.id);
//                gamemain.GameScreen.m_worldEntity.removeChild(this);
                this.visible = false;
                gamemain.EnemyLayer.instance.reclaim(this,this.textureName);
                return;
            }

            this.x = this.newPos.x;
            this.y = this.newPos.y;

        }

        public clearEnemy():void
        {
            gameworld.GameWorld.instance.removeEntityChild(this.id);
//            gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.EnemyLayer.instance.reclaim(this,this.textureName);
        }

        public boom():void
        {
            gameworld.GameWorld.instance.removeEntityChild(this.id);
//                gamemain.GameScreen.m_worldEntity.removeChild(this);
            this.visible = false;
            gamemain.EnemyLayer.instance.reclaim(this,this.textureName);
        }

        public deleteLife(l:number):void
        {
            this._life -= l;
        }

        public get life():number
        {
            return this._life;
        }


        public reborn():void
        {
            this._life = this._reborn;
        }
    }

}