// module-uudaa zarlah
// ugugdiin daldlalt hiisen maygaar zohion baiguulna
//delgersttei ajillah controller
var uiController = (function () {
  var DomSrtings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList : ".income__list",
    expenseList : ".expenses__list",
    tusuvLabel : ".budget__value",
    incomeLabel : ".budget__income--value",
    expenseLabel : ".budget__expenses--value",
    percentageLabel : ".budget__expenses--percentage"
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DomSrtings.inputType).value,
        description: document.querySelector(DomSrtings.inputDescription).value,
        value: parseInt(document.querySelector(DomSrtings.inputValue).value)
      };
    },
    getDomStings: function () {
      return DomSrtings;
    },

    clearFields : function(){
        var fields = document.querySelectorAll(DomSrtings.inputDescription + ", " + DomSrtings.inputValue );

        //list-iig massiv-ruu hurvuuleh list to array
        var fieldsArr = Array.prototype.slice.call(fields);
        fieldsArr.forEach(function(el,index,array){
            el.value = "";
        });

        fieldsArr[0].focus();

        // for (var i = 0; i < fieldsArr.length; i++)
        //     fieldsArr[i].value = "";
    },
    tusviigUzuuleh : function(tusuv){
      document.querySelector(DomSrtings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DomSrtings.incomeLabel).textContent = tusuv.totalInc;
      document.querySelector(DomSrtings.expenseLabel).textContent = tusuv.totalExp;
      if(tusuv.huvi !== 0){
        document.querySelector(DomSrtings.percentageLabel).textContent = tusuv.huvi + "%";
      }else
      document.querySelector(DomSrtings.percentageLabel).textContent = tusuv.huvi;
    },


    addListItem: function (item, type) {
      //Orlogo zarlagiin elmentiig aguulsan html-g beldene
      var html, list;
      if (type === "inc") {
        list = DomSrtings.incomeList;
        html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%DECSRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else {
        list = DomSrtings.expenseList;
        html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%DECSRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }

      //ter HTML dotroo orlogo zarlaguudiig Recplace ashiglaj uurchilj ugnu
      html = html.replace("%id%", item.id);
      html = html.replace("%DECSRIPTION%", item.description);
      html = html.replace("%VALUE%", item.value);
      // Beltegesen HTML ee DOM ruu hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//sanhuutei ajillah controller
var financeController = (function () {
  // private data
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // private data
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal =function(type){
    var sum = 0;
    data.items[type].forEach(function(el){
        sum = sum + el.value;
    });

    data.totals[type] = sum;

  }
  // private data
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
     tusuv : 0
  };

  
  return {
    tusuvTootsooloh : function(){
        //Niit orlogiin niilberiig tootsoolno
        calculateTotal("inc");

        // Niit zarlagiin niilberiig tootsoolno
        calculateTotal("exp");

        // Tusviig shineer tootsoolno
        data.tusuv = data.totals.inc - data.totals.exp;

        //Orlogo zarlagiin huviig tootsoolno
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        

    },

    tusviigAvah : function(){
        return {
            tusuv : data.tusuv,
            huvi : data.huvi,
            totalInc :  data.totals.inc,
            totalExp : data.totals.exp
        }
    },
    addItem: function (type, desc, val) {
      var item, id;
      if (data.items[type].length === 0) id = 1;
      else {
        //hmassiv-iin hamgiin suuliin elementiig oloh
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        //type === exp
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

//Program holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. oruulah ugugdiin delgetsees olj avna.
    var input = uiController.getInput();

    if(input.description !== "" && input.value!== ""){
  //2. Olj avsan ugugdluudeee sanhuugiin controllert damjuulj tend hadgalana.
  var item = financeController.addItem(
    input.type,
    input.description,
    input.value
  );
  //3. Olj avsan ugugluudee web deeree tohiroh hesegt n gargana.
  uiController.addListItem(item, input.type);
  uiController.clearFields();

  //4.Tusviig tootsoolno
  financeController.tusuvTootsooloh();
  //5.Etssiin uldegdel, tootsoog delgetsend gargana.
  var tusuv = financeController.tusviigAvah();

  // Tusviin tootsoog delgetsend gargana
  uiController.tusviigUzuuleh(tusuv);
};
    }

  
  var setupEventListeners = function () {
    var DOM = uiController.getDomStings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application start");
      uiController.tusviigUzuuleh({
        tusuv : 0,
            huvi : 0,
            totalInc :  0,
            totalExp : 0
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
