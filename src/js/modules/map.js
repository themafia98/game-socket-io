

export default class Map{

    constructor(props){

        this.imageWidth = props;
        this.images = {};
    }

    getSourceX(index){
        return (--index * 64) % 3200;
    }

    getSourceY(index){
        return Math.trunc((--index * 64) / 3200) * 64;
    }

    createMap(name,map,tileset){
        this.images[name] = tileset;
        const mapImg = document.createElement('canvas');
        mapImg.width = map.width * map.tilewidth;
        mapImg.height = map.height * map.tileheight;
        const ctx = mapImg.getContext('2d');
        let row,col;
        map.layers.forEach(layer => {
            if(layer.type == 'tilelayer'){
                row = 0;
                col = 0;
                layer.data.forEach(index =>{
                    if(index > 0){
                        ctx.drawImage(this.images.map,
                                    this.getSourceX(index), this.getSourceY(index),
                                    map.tilewidth,map.tileheight,
                                    col * map.tilewidth, row * map.tileheight,
                                    map.tilewidth,map.tileheight);
                    }
                    col++;
                    if(col > (map.width -1)){
                        col = 0;
                        row++;
                    }
                })
            }
        });

        this.images = mapImg;
        return new Map({
            name: name,
            sourceX:0,
            sourceY:0,
            width: mapImg.width,
            height: mapImg.height,
            images: mapImg
        });
    }
}