class Game extends eui.UILayer
{
    private static _instance:Game;
    public static get instance():Game
    {
        return Game._instance;
    }

    public roleManager:RoleManager;
    public random:Random;
	public constructor() 
	{
		super();
        Game._instance = this;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.roleManager = new RoleManager();
        this.random = new Random(0, RES.getRes("random_png"))
	}

    public getItemObj(id:number):any
    {
        var items = RES.getRes("items_json")["items"];
        for(let i:number =0 , len = items.length; i < len; i++ )
        {
            if(items[i].id == id)
            {
                return items[i];
            }
        }
        return null;
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

         letter = new Letter();
         this.addChild(letter);
         letter.visible = false;

        //  suicideConfim = new Confirm();
        //  this.addChild(suicideConfim);
        //  suicideConfim.visible = false;

    }

    private initDB():void
    {
        DBManager.addData("items_ske_json","items_tex_json","items_tex_png")
        //DBManager.addData("bubbles_json","texture2_json","texture2_png")
        //DBManager.addData("questAnim_json","texture3_json","texture3_png")
    }


}