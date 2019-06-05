export default class ViewPort{

    constructor(left, top, width, height){
        this.left  = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    update(left, top, width, height ){
        this.left  = left || 0;
        this.top = top || 0;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }

    check(polygon){
        return (polygon.left <= this.left &&
            polygon.right >= this.right &&
            polygon.top <= this.top &&
            polygon.bottom >= this.bottom);
    }

    overlaps(polygon) {
        return (this.left < polygon.right && 
            polygon.left < this.right && 
                this.top < polygon.bottom &&
                polygon.top < this.bottom);
    }
}