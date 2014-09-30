/**
 * Created by www on 2014/8/7.
 */
module gameworld
{
    /**/
    export class AABBox{
        public left:number;
        public right:number;
        public top:number;
        public bottom:number;

        public width:number;
        public height:number;
        public halfWidth:number;
        public halfHeight:number;
        public topLeft:Vector2D;
        public topRight:Vector2D;
        public bottomRight:Vector2D;
        public bottomLeft:Vector2D;
        public center:Vector2D;

        public constructor( center:Vector2D, width:number, height:number)
        {
            this.center = new Vector2D( center.x, center.y );

            this.width = width;
            this.height = height;
            this.halfWidth = width >>1;
            this.halfHeight = height>>1;

            this.left = center.x - this.halfWidth;
            this.right = center.x + this.halfWidth;
            this.top = center.y - this.halfHeight;
            this.bottom = center.y + this.halfHeight;

            this.topLeft = new Vector2D( this.left, this.top );
            this.topRight = new Vector2D( this.right, this.top );
            this.bottomRight = new Vector2D( this.right, this.bottom );
            this.bottomLeft = new Vector2D( this.left, this.bottom );
        }

        public Set( center:Vector2D, width:number, height:number ):void{
            this.center.x = center.x;
            this.center.y = center.y;

            this.width = width;
            this.height = height;
            this.halfWidth = width >>1;
            this.halfHeight = height >>1;

            this.left = center.x - this.halfWidth;
            this.right = center.x + this.halfWidth;
            this.top = center.y - this.halfHeight;
            this.bottom = center.y + this.halfHeight;

            this.topLeft.x = this.left;
            this.topLeft.y = this.top;
            this.topRight.x = this.right;
            this.topRight.y = this.top;
            this.bottomRight.x = this.right;
            this.bottomRight.y = this.bottom;
            this.bottomLeft.x = this.left;
            this.bottomLeft.y = this.bottom;
        }

        public setSize( width:number, height:number ):void{
            this.width = width;
            this.height = height;
            this.halfWidth = width >>1;
            this.halfHeight = height >>1;

            this.left = this.center.x - this.halfWidth;
            this.right = this.center.x + this.halfWidth;
            this.top = this.center.y - this.halfHeight;
            this.bottom = this.center.y + this.halfHeight;

            this.topLeft.x = this.left;
            this.topLeft.y = this.top;
            this.topRight.x = this.right;
            this.topRight.y = this.top;
            this.bottomRight.x = this.right;
            this.bottomRight.y = this.bottom;
            this.bottomLeft.x = this.left;
            this.bottomLeft.y = this.bottom;
        }

        /**
         * Centers the box at the specified point.
         * @param point Center point at which to move the box.
         *
         */
        public moveTo( point:Vector2D ):void {

            this.center.x = point.x;
            this.center.y = point.y;
            this.left = this.center.x - this.halfWidth;
            this.right = this.center.x + this.halfWidth;
            this.top = this.center.y - this.halfHeight;
            this.bottom = this.center.y + this.halfHeight;
            this.topLeft.x = this.left;
            this.topLeft.y = this.top;
            this.topRight.x = this.right;
            this.topRight.y = this.top;
            this.bottomRight.x = this.right;
            this.bottomRight.y = this.bottom;
            this.bottomLeft.x = this.left;
            this.bottomLeft.y = this.bottom;
        }

        public isOverlapping( box:AABBox ):boolean{
            return!( ( box.top > this.bottom ) ||
                ( box.bottom < this.top ) ||
                ( box.left > this.right ) ||
                ( box.right < this.left ) );
        }

        }
}