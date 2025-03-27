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
        }
    };
})();
//sanhuutei ajillah controller
var financeController = (function(){

    var Income = function(id,description, value){
         this.id = id;
         this.description= description;
         this.value= value;   
 };
    var Expense = function(id,description, value){
         this.id = id;
         this.description= description;
         this.value= value;   
};
var date = {
    allItems : {
        inc : [],
        exp : []
    },
    totals : {
        inc : 0,
        exp : 0
    }
}
    })();

//Program holbogch controller
    var appController = (function(uiController, fnController){
        
var ctrlAddItem = function(){
//1. oruulah ugugdiin delgetsees olj avna.
        console.log(uiController.getInput());
            //2. Olj avsan u
            // gugdluudeee sanhuugiin controllert damjuulj tend hadgalana.
            //3. Olj avsan ugugluudee web deeree tohiroh hesegt n gargana.
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
