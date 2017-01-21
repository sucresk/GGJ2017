class Confirm extends eui.Component {
	public constructor() {
		super();

		this.skinName = "ConfirmSkin";

		this.percentWidth = 100;
		this.percentHeight = 100;
	}

	public bg:eui.Image;
	public text:eui.Label;
	public rect:eui.Rect;
	public btnOk:eui.Button;
	public btnCancel:eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKClickHandler, this);
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClickHandler, this);
	}

	private call:()=>void;

	private onCancelClickHandler(e:egret.TouchEvent):void {
		this.visible = false;
	}
	private onOKClickHandler(e:egret.TouchEvent):void {
		this.visible = false;

		if (this.call) {
			this.call();
		}
	}
	
	public setContent(msg: string, call?:()=>void): void {
		
		this.text.text = msg;
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

var suicideConfim:Confirm;