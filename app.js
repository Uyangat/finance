// module-uudaa zarlah
// ugugdiin daldlalt hiisen maygaar zohion baiguulna
//delgersttei ajillah controller
var uiController = (function(){
})();
//sanhuutei ajillah controller
var financeController = (function(){
    })();
//Program holbogch controller
    var appController = (function(uiController, fnController){
var ctrlAddItem = function(){
//1. oruulah ugugdiin delgetsees olj avna.
console.log("delgetsees ugugdul avah heseg");
            //2. Olj avsan ugugdluudeee sanhuugiin controllert damjuulj tend hadgalana.
            //3. Olj avsan ugugluudee web deeree tohiroh hesegt n gargana.
            //4.Tusviig tootsoolno
            //5.Etssiin uldegdel, tootsoog delgetsend gargana.
}

        document.querySelector(".add__btn").addEventListener("click", function(){
            ctrlAddItem();
        });
        document.addEventListener("keypress", function(event) {
            if(event.keyCode === 13) {
                ctrlAddItem();
            }
        });
  
        })(uiController,financeController);
