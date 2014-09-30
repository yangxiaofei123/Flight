/**
 * Created by shaorui on 14-6-6.
 */
module fighter
{
    export class GameUtil
    {
        /**基于矩形的碰撞检测*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }

        public static stageW:number;
        public static stageH:number;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    export function createGridBitmapByName(name:string,x,y,w,h):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
 //       var rect:egret.Rectangle = new egret.Rectangle(x,y,w,h);
 //       result.scale9Grid =rect;
        return result;
    }
    /*
    * UI位置计算。
    * */
    export function moveToCenter(any:egret.DisplayObject,offX:number = 0,offY:number=0):void{
        any.x = ((fighter.GameUtil.stageW - any.width)>>1) + offX;
        any.y = ((fighter.GameUtil.stageH - any.height)>>1) + offY;
    }

    export function moveXYCenter(any:egret.DisplayObject,offX:number = 0,offY:number=0):void{
        any.x = ((fighter.GameUtil.stageW)>>1) + offX;
        any.y = ((fighter.GameUtil.stageH)>>1) + offY;
    }


}