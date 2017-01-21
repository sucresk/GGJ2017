class Talk extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		this.init();
	}

	private text:egret.TextField;

	private bg:egret.Bitmap;
	private init():void {
		this.bg = AssetManager.createBitmapByName("dialog_bg_png", false);
		this.addChild(this.bg);

		this.text = new egret.TextField();
		this.text.x = 10;
		this.text.y = 10;
		this.text.size = 18;

		this.addChild(this.text);
	}

	public setTalk(msg:string):void {
		this.text.text = msg;

		this.bg.width = this.text.width + 20;
		this.bg.height = this.text.height + 20;

		this.bg.y = -this.bg.height;
		this.text.y = this.bg.y + 10;
	}
}