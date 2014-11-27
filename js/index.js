var lang = null;
if(accedobroadband.querystring.getValue("lang") === null){
    lang = "en";
}else{
    lang = accedobroadband.querystring.getValue("lang");
}

var exitPath = null;
if(accedobroadband.querystring.getValue("exitPath") === null){
    exitPath = "../../index.html";
}else{
    exitPath = accedobroadband.querystring.getValue("exitPath");
}

constantsMode = true;
if (params.lang === null){
    params.lang = 'en';
}

var menuPos = 0;
var imagePath = "img/buttons/";

var images = {
    'menu_item_0':   'start_focus',
    'menu_item_1':   'help_unfocus',
    'menu_item_2':   'exit_unfocus'
};

var menuItems = [
'start',
'help',
'exit'
];

/**
* Loads images onto the page using their name and src from the supplied
* HashMap.
* @param list [HashMap] list of images as name: src
*/
function setImages(list){
    for (var imageName in list){
        if (typeof(list[imageName]) === 'string'){
            $(imageName).src = imagePath + lang + '/' + list[imageName] + '.png';
        }
    } 
}

function focusMenu(){
    $('menu_item_' + menuPos).src = imagePath + lang + '/' + menuItems[menuPos] + '_focus' + '.png';
}
    
function unfocusMenu(){
    $('menu_item_' + menuPos).src = imagePath + lang + '/' + menuItems[menuPos] + '_unfocus' + '.png';
}
	
function keyAction(event) {
    switch (event) {
        case KEY_LEFT:
            if (menuPos > 0) {
                unfocusMenu();
                menuPos--;
                focusMenu();
            }
            break;
        case KEY_RIGHT:
            if (menuPos < 2) {
                unfocusMenu();
                menuPos++;
                focusMenu();
            }
            break;
        case KEY_BACK:
            accedobroadband.redirect(exitPath + "?" + accedobroadband.querystring.parameters());
            break;
        /*case KEY_EXIT:
            accedobroadband.redirect(exitPath + "?" + accedobroadband.querystring.parameters());
            break;*/
        case KEY_ENTER:
            if (menuPos === 0){
                accedobroadband.redirect("blackjack.html?" + accedobroadband.querystring.parameters());
            }else if (menuPos == 1){
                accedobroadband.redirect("help.html?" + accedobroadband.querystring.parameters(["back=index"]));
            }else if (menuPos == 2){
                accedobroadband.redirect(exitPath + "?" + accedobroadband.querystring.parameters());
            }
            break;
    }
}
var keyEventFunction = keyAction;

function init() {
    initiateKeyHandler();
    setImages(images);
    /*$("bg").src = "img/blackjack_"+params.lang+"_vista.jpg";
    $("start").src = "img/buttons/"+params.lang+"/start_focus.png";
	$("help").src = "img/buttons/"+params.lang+"/help_unfocus.png";
	$("exit").src = "img/buttons/"+params.lang+"/exit_unfocus.png";*/
}