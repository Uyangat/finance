// module-uudaa zarlah
// ugugdiin daldlalt hiisen maygaar zohion baiguulna
//delgersttei ajillah controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expeseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePersentageLabel: ".item__percentage",
    dateLabel : ".budget__title--month"
  };

  //Nodelst-d zoriulsan tusgai dotood function

  var nodeListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  
  var formatMoney = function(too, type) {
    too = "" + too;
    var x = too
      .split("")
      .reverse()
      .join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y
      .split("")
      .reverse()
      .join("");

    if (z[0] === ",") z = z.substr(1, z.length - 1);

    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };
  return {
    displayDate: function(){
      var unuudur =  new Date();
      document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getFullYear() + " оны " + unuudur.getMonth() + " -р сарын ";

    },

    changeType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDescription +
          ", " +
          DOMstrings.inputValue
      );
      nodeListForeach(fields, function(el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle("red");
    },

    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },
// Bodoj olson huviig zazrlagiin element bolgonii hajuud gargana
 displayPercentages: function(allPercentages){
  //Zarlagiin NoeList-iig oloh
  var elements = document.querySelectorAll(
    DOMstrings.expensePersentageLabel
  );

  //Element bolgonii huvid zarlagiin huviig massiv-aaas avch shivj oruulah
  nodeListForEach(elements, function(el,index){
    el.textContent = allPercentages[index];
  });
 },
    getDOMstrings: function() {
      return DOMstrings;
    },

    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // Convert List to Array
      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },
    tusviigUzuuleh: function(tusuv) {
      document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstrings.incomeLabel).textContent =tusuv.totalInc;
      document.querySelector(DOMstrings.expeseLabel).textContent =tusuv.totalExp;

      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
      }
    },
    deleteListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function(item, type) {
      // ﾐ樮ﾐｻﾐｾﾐｳﾐｾ ﾐｷﾐｰﾑﾐｻﾐｰﾐｳﾑ巾ｽ ﾑ災ｻﾐｵﾐｼﾐｵﾐｽﾑひｸﾐｹﾐｳ ﾐｰﾐｳﾑτσｻﾑ�ｰﾐｽ html-ﾐｸﾐｹﾐｳ ﾐｱﾑ災ｻﾑひｳﾑ災ｽﾑ�.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // ﾐ｢ﾑ采 HTML ﾐｴﾐｾﾑびﾐｾﾐｾ ﾐｾﾑﾐｻﾐｾﾐｳﾐｾ ﾐｷﾐｰﾑﾐｻﾐｰﾐｳﾑ巾ｽ ﾑτひｳﾑτσｴﾑ巾ｳ REPLACE ﾐｰﾑ威ｸﾐｳﾐｻﾐｰﾐｶ ﾓｩﾓｩﾑﾑ�ｸﾐｻﾐｶ
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));

      // ﾐ帯災ｻﾑひｳﾑ采�災ｽ HTML ﾑ采� DOM ﾑﾑτ� ﾑ�ｸﾐｹﾐｶ ﾓｩﾐｳﾐｽﾓｩ.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    }
  };
})();

//sanhuutei ajillah controller
var financeController = (function() {
  // private data
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome>0)
    this.percentage = Math.round((this.value / totalIncome)*100);
  else this.percentage = 0;
  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };
  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };

  // private data
  var data = {
    items: {
      inc: [],
      exp: []
    },

    totals: {
      inc: 0,
      exp: 0
    },

    tusuv: 0,

    huvi: 0
  };
//Public service
  return {
    tusuvTootsooloh : function(){
        //Niit orlogiin niilberiig tootsoolno
        calculateTotal("inc");

        // Niit zarlagiin niilberiig tootsoolno
        calculateTotal("exp");

        // Tusviig shineer tootsoolno
        data.tusuv = data.totals.inc - data.totals.exp;

        //Orlogo zarlagiin huviig tootsoolno
        if(data.totals.inc >0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi= 0;
    },
// Huviig tootsooloh 
    calcualatePercentages : function(){
      data.items.exp.forEach(function(el){
        el.calcPercentage(data.totals.inc);
      });
    },

getPercentages : function(){
 var allPercentages = data.items.exp.map(function(el){
  return el.getPercentage();
 });
 return allPercentages;
},

    tusviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

    addItem: function(type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);

      return item;
    },

    seeData: function() {
      return data;
    }
  };
})();

//Program holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Oruulah ugugdliin delgetsees olj avna.
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

  //Tusviig shineer tootsoolood delgetsend uzuulne.
  updateTusuv();
};
    };

    var updateTusuv= function(){
        //4.Tusviig tootsoolno
  financeController.tusuvTootsooloh();
  //5.Etssiin uldegdel, tootsoog delgetsend gargana.
  var tusuv = financeController.tusviigAvah();

  // 6.Tusviin tootsoog delgetsend gargana
  uiController.tusviigUzuuleh(tusuv);

//7. Elementuudiin Huviig Tootsoolon 
      financeController.calcualatePercentages();
//8. Tootsoolson elementuudiin huviig huleej avna
      var allPercentages = financeController.getPercentages();
//9. Edgeer huviig delgetsend gargana

uiController.displayPercentages(allPercentages);
};

var setupEventListeners = function() {
  var DOM = uiController.getDOMstrings();

  document.querySelector(DOM.addBtn).addEventListener("click", function() {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

  document
    .querySelector(DOM.inputType)
    .addEventListener("change", uiController.changeType);

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          // inc-2
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          console.log(type + " ===> " + itemId);


        // 1 Sanhuugiin module-as type, id ashiglaad ustgana
        financeController.deleteItem(type, itemId);

        //2 Delgets deerees ene elementiig ustgana
        uiController.deleteListItem(id);
        //3 Uldegdel tootsoog shinechilj haruulna
        updateTusuv();
      }
    })
  };

  return {
    init: function() {
      console.log("Application started...");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
