module gameui {
    export class GameProgressBar extends egret.DisplayObjectContainer
    {

        private bg:egret.Bitmap;
        private pg:egret.Bitmap;
        private pgW:number;
        private pgH:number;

        public constructor(bgName:string, pgName:string,  pgW:number, pgH:number=0,x:number = 0,y:number = 0,w:number = 0,h:number = 0, offX:number=0, offY:number=0) {
            super();
            this.createBar(bgName,pgName,pgW,pgH,x,y,w,h,offX,offY);
        }
        /**创建进度条*/
        public createBar(bgName:string, pgName:string, pgW:number, pgH:number,x,y,w,h, offX:number, offY:number):void {
            //竟然不能用mask，而且九宫格还得自己赋值，资源配置没有用
            this.pg = fighter.createGridBitmapByName(pgName,x,y,w,h);
            this.bg = fighter.createBitmapByName(bgName);
            this.addChild(this.pg);
            this.addChild(this.bg);
            this.pg.x = offX;
            this.pg.y = offY;
            this.pgW = pgW;
//            this.pgH = pgH;
            this.setProgress(0,1);
        }
        /*设置进度*/
        public setProgress(current:number, total:number):void {
            this.pg.width = this.pgW * (current /total);
        }

        public dispose():void {

        }
    }
}
