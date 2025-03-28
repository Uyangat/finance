// module-uudaa zarlah
// ugugdiin daldlalt hiisen maygaar zohion baiguulna
//delgersttei ajillah controller
var uiController = (function(){
var DomSrtings = {
    inputType : ".add__type",
    inputDescription : ".add__description",
    inputValue : ".add__value",
    addBtn : ".add__btn"
}
    return {
        getInput : function(){
            return {
                type : document.querySelector(DomSrtings.inputType).value,
                description : document.querySelector(DomSrtings.inputDescription).value,
                value : document.querySelector(DomSrtings.inputValue).value
            };
        },
        getDomStings: function(){
            return DomSrtings;
        },
        addListItem : function(item, type){
            //Orlogo zarlagiin elmentiig aguulsan html-g beldene
            var html,list;
            if (type === "inc"){
                list = ".income__list";
                html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%DECSRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
            } else {
                list = ".expenses__list";
                html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%DECSRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
            };

            //ter HTML dotroo orlogo zarlaguudiig Recplace ashiglaj uurchilj ugnu
            html = html.replace("%id%",item.id);
            html =html.replace("%DECSRIPTION%",item.description);
            html =html.replace("%VALUE%",item.value);
            // Beltegesen HTML ee DOM ruu hiij ugnu
            document.querySelector(list).insertAdjacentHTML("beforeend",html);

        }
    };
})();


//sanhuutei ajillah controller
var financeController = (function(){
// private data
    var Income = function(id,description, value){
         this.id = id;
         this.description= description;
         this.value= value;   
 };
 // private data
    var Expense = function(id,description, value){
         this.id = id;
         this.description= description;
         this.value= value;   
};
// private data
var data = {
    items : {
        inc : [],
        exp : []
    },
    totals : {
        inc : 0,
        exp : 0
    }
};
 return{
    addItem : function(type, desc, val){
        var item, id;
        if(data.items[type].length === 0 ) id = 1;
        else{
            //hmassiv-iin hamgiin suuliin elementiig oloh
          id = data.items[type][data.items[type].length - 1].id + 1;  
        }
        if(type === "inc"){
            item = new Income(id, desc,val);
        } else {
            //type === exp
            item = new Expense(id, desc,val);
        }
        data.items[type].push(item);

        return item;
    },

    seeData :  function (){
            return data;
    }
 };

    })();

//Program holbogch controller
    var appController = (function(uiController, financeController){
        
var ctrlAddItem = function(){
//1. oruulah ugugdiin delgetsees olj avna.
var input = uiController.getInput();
        
            //2. Olj avsan ugugdluudeee sanhuugiin controllert damjuulj tend hadgalana.
           var item = financeController.addItem(input.type, input.description, input.value);
            //3. Olj avsan ugugluudee web deeree tohiroh hesegt n gargana.
            uiController.addListItem(item,input.type);
            //4.Tusviig tootsoolno
            //5.Etssiin uldegdel, tootsoog delgetsend gargana.
};
    var setupEventListeners = function(){
    var DOM = uiController.getDomStings();
    document.querySelector(DOM.addBtn).addEventListener("click", function(){
        ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
        if(event.keyCode === 13) {
            ctrlAddItem();
        }
    });
};

return {
    init : function(){
        console.log("Application start");
        setupEventListeners();
    }
};
        })(uiController,financeController);

        appController.init();
