var lang= null;
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
var position;

var POS_EXIT = 4;
var POS_RULES_PREVIOUS = 9;
var POS_RULES_NEXT = 10;
var current_page = 0;
function setFocus(el) {
    switch(el) {
        case "img_exit":
            $(el).src = "img/buttons/" + lang + "/back_focus.png";
            position = POS_EXIT;
            break;
        case "img_previous":
            $(el).src = "img/buttons/" + lang + "/previous_focus.png";
            position = POS_RULES_PREVIOUS;
            break;
        case "img_next":
            $(el).src = "img/buttons/" + lang + "/next_focus.png";
            position = POS_RULES_NEXT;
            break;
    }
}
function dropFocus(el) {
    switch(el) {
        case "img_exit":
            $(el).src = "img/buttons/" + lang + "/back_unfocus.png";
            break;
        case "img_previous":
            $(el).src = "img/buttons/" + lang + "/previous_unfocus.png";
            break;
        case "img_next":
            $(el).src = "img/buttons/" + lang + "/next_unfocus.png";
            break;
    }
}

function keyAction(event) {
    if (event === KEY_ENTER) {
        if(position === POS_EXIT) {
            accedobroadband.redirect(params.back + ".html?" + accedobroadband.querystring.parameters());
        } else if(position === POS_RULES_PREVIOUS) {
            //keyAction(KEY_LEFT)
            if (current_page == 1) {
                current_page--;
                $("img_rules").src = "img/text/" + lang + "/rules0.png";
                $("img_previous").style.visibility = "hidden";
                $("dvPrevious").style.visibility = "hidden";
                $("img_next").style.visibility = "visible";
                $("dvNext").style.visibility = "visible";
                setFocus("img_next");
            }
        } else if(position === POS_RULES_NEXT) {
            //keyAction(KEY_RIGHT)
            if (current_page === 0) {
                current_page++;
                $("img_rules").src = "img/text/" + lang + "/rules1.png";
                $("img_previous").style.visibility = "visible";
                $("dvPrevious").style.visibility = "visible";
                $("img_next").style.visibility = "hidden";
                $("dvNext").style.visibility = "hidden";
                setFocus("img_previous");
            }
        }

    }
    if (event === KEY_BLUE) {
        alert($("img_previous").src);
    }
    else if (event === KEY_LEFT) {
    /*$("img_rules").src = "img/bj/rules0_" + params.lang + ".png";
		$("dvPrevious").style.visibility = "hidden";
		$("dvNext").style.visibility = "visible";
		setFocus("img_next");*/
    }
    else if (event === KEY_RIGHT) {
    /*$("img_rules").src = "img/bj/rules1_" + params.lang + ".png";
		$("dvPrevious").style.visibility = "visible";
		$("dvNext").style.visibility = "hidden";
		setFocus("img_previous");*/
    }
    else if (event === KEY_UP) {
        setFocus("img_exit");
        dropFocus("img_previous");
        dropFocus("img_next");
    }
    else if (event === KEY_DOWN) {
        if (position == POS_EXIT)
        {
            dropFocus("img_exit");
        }
        if($("img_previous").style.visibility == "visible") {
            setFocus("img_previous");
        } else if($("img_next").style.visibility == "visible") {
            setFocus("img_next");
        }
    }

    else if (event === KEY_BACK){
        accedobroadband.redirect("index.html?" + accedobroadband.querystring.parameters());
    }/*else if (event === KEY_EXIT){
        accedobroadband.redirect(exitPath + "?" + accedobroadband.querystring.parameters());
    }*/

}
var keyEventFunction = keyAction;


function init() {
    $("img_rules").style.visibility = "visible";
    $("img_previous").style.visibility = "hidden";
    $("dvPrevious").style.visibility = "hidden";
    $("img_next").style.visibility = "visible";
    $("dvNext").style.visibility = "visible";
    $("img_exit").style.visibility = "visible";
    $("img_rules").src = "img/text/" + lang + "/rules0.png";
    $("img_previous").src = "img/buttons/" + lang + "/previous_unfocus.png";
    $("img_next").src = "img/buttons/" + lang + "/next_focus.png";
    $("img_exit").src = "img/buttons/" + lang + "/back_unfocus.png";
    position = POS_RULES_NEXT;
    initiateKeyHandler();
}