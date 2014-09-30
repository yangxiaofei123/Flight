/**
 * Created by www on 2014/8/8.
 */
module gameworld {
    /*2维向量*/
    export class Vector2D {
        public x:number;
        public y:number;
        private _length = 0;
        private _oldX:Number;
        private _oldY:Number;
        public constructor(x:number =0,y:number=0 )
        {
            this.x = x;
            this.y = y;
            this._length = 0;
        }

        public get length():Number{
            if(this._oldX != this.x || this._oldY != this.y){
                this._oldX = this.x;
                this._oldY = this.y;
                this._length = Math.sqrt((this.x*this.x) + (this.y*this.y));
            }
            return this._length;
        }

        public copy():Vector2D{
            var newVector:Vector2D = new Vector2D(this.x,this.y);
            newVector._length = this._length;
            newVector._oldX = this.x;
            newVector._oldY = this.y;
            return newVector;
        }
    }
}