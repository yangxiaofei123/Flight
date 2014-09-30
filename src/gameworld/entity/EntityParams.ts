/**
 * Created by www on 2014/8/7.
 */
module gameworld
{
    /**/
    export class EntityParams{

        public radius:number;
        public id:string;
        public rotation:number;
        public scale:number;
        public layer:number;
        public isCollidable:boolean;
        public parent:gameworld.Entity;
        public textureName:string;
        public life:number;
        public score:number;
        public constructor( )
        {
            this.radius = 0;
            this.rotation = 0;
            this.scale = 1;
            this.layer = 1;
            this.textureName = "";
            this.life = 0;
            this.score = 0;
        }
    }
}