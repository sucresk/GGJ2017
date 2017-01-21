class Game extends eui.UILayer
{
    private static _instance:Game;
    public static get instance():Game
    {
        return Game._instance;
    }

    public roleManager:RoleManager;

	public constructor() 
	{
		super();
        Game._instance = this;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.roleManager = new RoleManager();
	}

	private onAdded(e:egret.Event):void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.init();
    }


	private init():void
    {
        console.log("this is a new game!");
        this.initDB();
        var sceneManager:SceneManager = new SceneManager(this);
        
        sceneManager.registerScene("gameInfo", new GameInfo());
        sceneManager.registerScene("gameLevel", new GameLevel());
        sceneManager.setCurSceneByName("gameLevel");
        sceneManager.startTick();

        packageList = new PackageList();
        this.addChild(packageList);
         packageList.bottom = 0;

         talk = new Talk();
         this.addChild(talk);
         talk.visible = false;
    }

    private initDB():void
    {
        DBManager.addData("items_ske_json","items_tex_json","items_tex_png")
        //DBManager.addData("bubbles_json","texture2_json","texture2_png")
        //DBManager.addData("questAnim_json","texture3_json","texture3_png")
    }


}