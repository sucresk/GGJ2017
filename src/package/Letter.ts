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

	setLetter(id:number):void {

		let item = RES.getRes("items_json")["items"][id - 1];
		this.d.text = item.content;

		this.visible = true;

	}
}


var letter:Letter;