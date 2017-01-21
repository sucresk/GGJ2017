class PackageIcon extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowHandler, this);
	}

	private onShowHandler(e:egret.TouchEvent):void {

		let item = RES.getRes("items_json")["items"][this.data.id - 1];
		if (item.type == "letter") {
			letter.setLetter(item.id);
		}
		else {
			talk.setTalk(item.content);
		}
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.d = {};

		let item = RES.getRes("items_json")["items"][this.data.id - 1];
		this.d.icon = item.icon;
	}

	data: {id:number};
	d: any;
}