class Letter extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.d = {};

		this.percentWidth = 100;
		this.percentHeight = 100;
	}

	public group:eui.Group;

	protected childrenCreated():void
	{
		super.childrenCreated();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}
	private onClickHandler(e:egret.TouchEvent):void {
		this.visible = false;

	}
	
		
	private d:any;
	private qrCode:egret.Sprite
	setLetter(id:number):void {

		let item = RES.getRes("items_json")["items"][id - 1];
		this.d.text = item.content;

		var roleIndex = id - 1;
		// var roleId = roleDefine[roleIndex];
		if(this.qrCode && this.qrCode.parent)
		{
			this.qrCode.parent.removeChild(this.qrCode);
		}
		var url:string = Game.instance.gameURL + "?rid=" + roleIndex;
		 this.qrCode = qr.QRCode.create(url);
		 console.log(url);
		 this.qrCode.x = this.width / 2;
		 this.qrCode.y = this.height / 2;
        this.addChild(this.qrCode);

		this.visible = true;

	}
}


var letter:Letter;