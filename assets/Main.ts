import { _decorator, clamp, Component, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property(Sprite) sp: Sprite = null;

    private _melt: number = 0;
    private _isAdd: boolean = false;
    private _playing: boolean = false;

    start() {

    }

    update(deltaTime: number) {
        if(!this._playing) return;

        this._melt += (this._isAdd ? 1 : -1) * deltaTime;
        if(this._melt > 1 || this._melt < 0) {
            this._playing = false;
            this._melt = clamp(this._melt, 0, 1);
            if(this._melt == 1) {
                this.sp.node.active = false;
            }
        }
        
        this.sp.getSharedMaterial(0).setProperty('burnThreshold', this._melt);
    }
    
    melt() {
        this.sp.node.active = true;
        this._isAdd = true;
        this._playing = true;
    }

    resume() {
        this.sp.node.active = true;
        this._isAdd = false;
        this._playing = true;
    }
}


