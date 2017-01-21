class PackageIcon extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowHandler, this);
	}

	private onShowHandler(e:egret.TouchEvent):void {

		// let item = RES.getRes("items_json")["items"][this.data.id - 1];
		let item = Game.instance.getItemObj(this.data.id);
		if (item.type == "letter") {
			letter.setLetter(item.id);
		}
		else if(item.type == "code")
		{
			talk.setTalk(this.getCode(item.content))
		}
		else if(item.type == "codeSegment")
		{
			talk.setTalk(item.content + " = " + item.key)
		}
		else {
			talk.setTalk(item.content);
		}
	}

	protected dataChanged(): void {
		super.dataChanged();
		this.d = {};

		// let item = RES.getRes("items_json")["items"][this.data.id - 1];
		let item = Game.instance.getItemObj(this.data.id);
		this.d.icon = item.icon;
	}

	private getCode(str:string):string
	{
		// var codeSegments = [];
		// if(userGameData.package && userGameData.package.length)
		// {
		// 	for(let i = 0, len = userGameData.package.length; i < len; i++)
		// 	{
		// 		let item = Game.instance.getItemObj(userGameData.package[i]);
		// 		if(item.type == "codeSegment")
		// 		{
		// 			codeSegments.push(item.id);
		// 		}
		// 	}
		// }

		var msg:string = "(";
		let hasSegment:boolean = false;
		for(let i = 9; i <= 15; i++)
		{
			let item = Game.instance.getItemObj(i);
			if(userGameData.package.indexOf(i) == -1)
			{
				msg += item.content;
			}
			else
			{
				msg += item.key;
				hasSegment = true;
			}
		}
		msg += ")";
		if(hasSegment)
		{
			return str + "\n\n" + msg;
		}
		return str;
	}

	data: {id:number};
	d: any;
}