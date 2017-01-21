class PackageIcon extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
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