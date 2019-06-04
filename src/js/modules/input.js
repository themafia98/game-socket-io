export default function input(player,go,settings,camera){

        switch(go){
        case 'down': {
            player.coords.H += player.speed;
            player.position = 'down';
            break;
        }
        case 'up': {
            player.coords.H -= player.speed;
            player.position = 'up';
            break;
        }
        case 'left': {
            player.coords.W -= player.speed;
            player.position = 'left';
            player.currentSprite = settings.sprite.spriteMenLeft;
            break;
        }
        case 'right': {
            player.coords.W += player.speed;
            player.position = 'right';
            player.currentSprite = settings.sprite.spriteMenRight;
            break;
        }
    }
}