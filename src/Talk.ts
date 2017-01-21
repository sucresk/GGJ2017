class Talk extends eui.Component {
	public constructor() {
		super();

		this.skinName = "TalkSkin";

		this.percentWidth = 100;
		this.percentHeight = 100;
	}

	public bg:eui.Image;
	public text:eui.Label;
	public rect:eui.Rect;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	private call:()=>void;

	private onClickHandler(e:egret.TouchEvent):void {
		this.visible = false;

		if (this.call) {
			this.call();
		}
	}
	
	public setTalk(msg: string, call?:()=>void): void {
		
		this.text.text = msg + "\n";
		this.call = call;

		this.bg.scaleX = this.bg.scaleY = 1;
		this.bg.width = this.text.width + 20;
		this.bg.height = this.text.height + 20;

		this.bg.y = this.height / 2 - this.bg.height / 2;
		this.bg.x = this.width / 2 - this.bg.width / 2;
		this.text.y = this.bg.y + 10;
		this.text.x = this.bg.x + 10;

		this.visible = true;
	}
}

var talk:Talk;