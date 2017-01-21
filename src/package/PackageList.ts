class PackageList extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private ac:eui.ArrayCollection;
	protected childrenCreated(): void {
		super.childrenCreated();

		this.ac.removeAll();
	}

	addID(packageID:number):void {
		this.ac.addItem({id:packageID});
	}
}

var packageList:PackageList;