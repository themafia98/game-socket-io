export default function input(player,go,settings,camera){

        switch(go){
        case 'down': {
            camera.move(0,-5);
            player.coords.y += player.speed;
            player.position = 'down';
            break;
        }
        case 'up': {
            camera.move(0,5);
            player.coords.y -= player.speed;
            player.position = 'up';
            break;
        }
        case 'left': {
            camera.move(5,0);
            player.coords.x -= player.speed;
            player.position = 'left';
            player.currentSprite = settings.sprite.spriteMenLeft;
            break;
        }
        case 'right': {
            camera.move(-5,0);
            player.coords.x += player.speed;
            player.position = 'right';
            player.currentSprite = settings.sprite.spriteMenRight;
            break;
        }
    }
}