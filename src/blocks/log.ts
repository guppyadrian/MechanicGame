import { Box } from "./box";

class Log extends Box {
    standing: boolean;
    vertical: boolean; // will roll left/right if true

    constructor(x: number, y: number) {
        super(x, y);
        this.type = 'log';

        this.standing = true;
        this.vertical = false;
    }

    override move(x: number, y: number) {

        

        if (this.standing) {
            // then push over, based on direction of force
            
        }

        return true;
    }
}