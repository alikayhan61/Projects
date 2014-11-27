constantsMode = true;
var test = "adads";
var test = "adads";
var test = "adads";
var test = "adads";

var lang= null;
if(accedobroadband.querystring.getValue("lang") === null){
    lang = "en";
}else{
    lang = accedobroadband.querystring.getValue("lang");
}
if (params.lang === null) {
    params.lang = 'en';
}
var exitPath = "index.html?" + accedobroadband.querystring.parameters();

var b_sound = false;
var b_svp = false;

var ih;

var zap = 1;

b_warning = false; // True if warningsign visible, else false.
var d, p, bj; // global d(ealer) and p(layer) objects, also bj(shoe) object
var deck = ["ha","h2","h3","h4","h5","h6","h7","h8","h9","ht","hj","hq","hk","sa","s2","s3","s4","s5","s6","s7","s8","s9","st","sj","sq","sk","da","d2","d3","d4","d5","d6","d7","d8","d9","dt","dj","dq","dk","ca","c2","c3","c4","c5","c6","c7","c8","c9","ct","cj","cq","ck"];

var min_bet = 50;
var max_bet = 200;

var b_key_up = true;
var b_even_money_open = false;
var b_insurance_open = false;
var b_double_down_open = false;
var b_play_again_open = false;
var b_help_open = false;

var delay_btn = 100;

var b_bet_ok = true;
var b_stand_ok = false;
var b_deal_ok = true;
var b_hit_ok = false;

var msg = [];

var POS_BET_STAND = 1;
var POS_DEAL_HIT = 2;
var POS_INFO = 3;
var POS_EXIT = 4;
var POS_DOUBLE_DOWN = 5;
var POS_NO = 6;
var POS_YES = 7;
var POS_RULES_PREVIOUS = 9;
var POS_RULES_NEXT = 10;
var POS_SVP = 11;
var POS_INS = 12;
var position = POS_BET_STAND;
var current_page = 0;

function exitGame() {
    accedobroadband.redirect(exitPath);
}

function Shoe(decks) { // the Shoe object represents all cards from all decks
    this.decks = decks;
    this.pile = function() {
        this.cards = [];
        this.cc = "";
        for (var i=0;i<decks;i++)
        {
            this.cc += ".concat(deck)";
        }
        this.cards = eval("this.cards"+this.cc);
    };
    this.shuffle = function() {
        this.shuffler = [];
        for (var i=0;i<this.decks*52;i++)
        {
            this.shuffler.push(this.cards.splice(Math.floor(Math.random()*this.cards.length), 1));
        }
        this.cards = this.shuffler;
    };
    this.draw = function() {
        return(this.cards.shift());
    };
}



//Removed Shoe functionality to remove NaN problem from iusacell/huawei release
function addCard(a, el, card) { // draws the next card from the stack, displays it and adds it to the calling hand
    if (card) {
        a.push(card);
        el.innerHTML += '<div style="position:absolute;left:'+((a.length*25)+(Math.floor(Math.random()*10)))+'px;top:'+(Math.floor(Math.random()*10))+'px;"><img alt="" src="img/Deck_115x160/'+a[a.length-1]+'.png"/></div>';
    } else {
        a.push(deck[Math.floor(Math.random()*52)]);   //To get shoe func back comment this line and uncomment line below!
        //a.push(bj.draw());
        el.innerHTML += '<div style="position:absolute;left:'+((a.length*25)+(Math.floor(Math.random()*10)))+'px;top:'+(Math.floor(Math.random()*10))+'px;"><img alt="" src="img/Deck_115x160/'+a[a.length-1]+'.png"/></div>';
    }
}




function evalDealerHand(force) {
    if (!force) {
        if (p.b_even && d.hand.length==1) {
            d.draw();
        }
        else if (!p.b_even) {
            d.draw();
        }
        else {
            return(false);
        }
    }
    
    a = d.hand;
    el = $("dvDealerPoints");
    var pnts = parseInt(0);	// regular score
    var l_pnts = parseInt(0);	// score counted low
    var h_pnts = parseInt(0);	// score counted high
    var n_aces = parseInt(0);	// number of aces
    var low=true;	// ace counts low
    for (var i=0;i<a.length;i++) {
        //@todo
        if (a[i].toString().indexOf("t")>-1 || a[i].toString().indexOf("j")>-1 || a[i].toString().indexOf("q")>-1 || a[i].toString().indexOf("k")>-1) {
            pnts += parseInt(10);
        } else if (a[i].toString().indexOf("a")>-1) {
            n_aces++;
        } else {
            pnts+=parseInt(a[i].toString().substring(1,2));
        }
    }
    if (n_aces>0) {
        h_pnts=parseInt(pnts+(n_aces*1));
        l_pnts=parseInt(h_pnts);
	
        for (i=0;i<n_aces;i++) {
            if (parseInt(h_pnts+10)<22) {
                h_pnts += parseInt(10);
                low = false;
            }
        }
        if (low) {
            if (l_pnts>21) {
                if(lang=="es"){
                    el.innerHTML = "TE PASASTE!";
                }else{
                    el.innerHTML = "BUST!";
                }
                d.score = l_pnts;
                document.getElementById('dealer_arrow').style.visibility = "visible";   
            } else {
                d.score=parseInt(l_pnts);
                el.innerHTML=parseInt(d.score);
                document.getElementById('dealer_arrow').style.visibility = "visible";   
                if (parseInt(l_pnts)<17) {
                    return(true);
                }
            }
        } else {
            if (a.length==2 && h_pnts==parseInt(21)) {
                el.innerHTML = "BLACK JACK";
                d.score = "bj";
                document.getElementById('dealer_arrow').style.visibility = "visible";   
            } else {
                d.score = parseInt(h_pnts);
                el.innerHTML = parseInt(d.score);
                document.getElementById('dealer_arrow').style.visibility = "visible";   
                if (h_pnts<17) {
                    return(true);
                }
            }
            
        }
    } else {
        if (pnts>21) {
            if(lang=="es"){
                el.innerHTML = "TE PASASTE!";
            }else{
                el.innerHTML = "BUST!";
            }
            document.getElementById('dealer_arrow').style.visibility = "visible";   
            d.score = pnts;
        } else {
            d.score = parseInt(pnts);
            el.innerHTML = parseInt(d.score);
            document.getElementById('dealer_arrow').style.visibility = "visible";   
            if (pnts<17) {
                return(true);
            }
        }
    }
    return(false);
}

function evalPlayerHand(a, el) {
    var pnts = 0;		// regular score
    var l_pnts = parseInt(0);	// score counted low
    var h_pnts = parseInt(0);	// score counted high
    var n_aces = parseInt(0);	// number of aces
    var low = true;	// ace counts low
    for (var i=0;i<a.length;i++) {
        if (a[i].toString().indexOf("t")>-1 || a[i].toString().indexOf("j")>-1 || a[i].toString().indexOf("q")>-1 || a[i].toString().indexOf("k")>-1) {
            pnts += parseInt(10);
        } else if (a[i].toString().indexOf("a")>-1) {
            n_aces++;
        } else {
            pnts += parseInt(a[i].toString().substring(1,2));
        }
    }
    if (n_aces>0) {
        l_pnts = h_pnts = pnts+(n_aces*1); // score is calculated with all aces as 1
        
        for (i=0;i<n_aces;i++) { // adds 10 points for each ace that possibly could count as 11 without busting the hand
            if (parseInt(h_pnts+10)<22) {
                h_pnts += parseInt(10);
                low = false;
            }
        }
        if (low) {
            if (l_pnts>21) {
                if(lang=="es"){
                    el.innerHTML = "TE PASASTE!";
                }else{
                    el.innerHTML = "BUST!";
                }
                document.getElementById('player_arrow').style.visibility = "visible";                
                p.win(-1);
            } else if (a.length==2 && l_pnts<12 && l_pnts>2) { // conditions for double down opportunity
                el.innerHTML = parseInt(p.score) = parseInt(l_pnts);
                document.getElementById('player_arrow').style.visibility = "visible";
                $("dvDoubleDown").style.visibility = "visible";
                b_double_down_open = true;
                setFocus("img_double_down");
            } else {
                p.score = parseInt(l_pnts);
                el.innerHTML = parseInt(p.score);
                document.getElementById('player_arrow').style.visibility = "visible";                
            }
        } else {
            if (a.length==2 && h_pnts==21) { // initial conditions for black jack
                p.score = "bj";
                b_stand_ok = false;
                b_hit_ok = false;
                //el.innerHTML = "BLACK JACK"; //Mikael
                if (d.hand[0].toString().indexOf("a")<0) { // if the dealers upcard is not an ace
                    p.win(1.5);
                }
            } else {
                if (h_pnts==21) {
                    el.innerHTML = parseInt(h_pnts);
                } else {
                    if (a.length==2 && l_pnts<12 && l_pnts>2) { // conditions for double down opportunity
                        $("dvDoubleDown").style.visibility = "visible";
                        b_double_down_open = true;
                        setFocus("img_double_down");
                        
                    }
                    if(lang=="es"){
                        el.innerHTML = parseInt(l_pnts)+" o "+parseInt(h_pnts);
                    }else{
                        el.innerHTML = parseInt(l_pnts)+" or "+parseInt(h_pnts);
                    }
                    
                }
                p.score = parseInt(h_pnts);
                document.getElementById('player_arrow').style.visibility = "visible";                
            }
        }
    } else {
        if (pnts>21) {
            if(lang=="es"){
                
                el.innerHTML = "TE PASASTE!";
            }else{
                el.innerHTML = "BUST!";
            }
            p.win(-1);
            document.getElementById('player_arrow').style.visibility = "visible";
        } else if (a.length==2 && pnts<12 && pnts>2) { // conditions for double down opportunity
            p.score = parseInt(pnts);
            el.innerHTML = parseInt(p.score);
            b_double_down_open = true;
            setFocus("img_double_down");
            $("dvDoubleDown").style.visibility = "visible";
            document.getElementById('player_arrow').style.visibility = "visible";            
        } else {
            el.innerHTML = parseInt(pnts);
            document.getElementById('player_arrow').style.visibility = "visible";
            //updatePoints(pnts);
            p.score = parseInt(pnts);
        }
    }
}


function updatePoints(points) {
    var symbolarr = _.flapBoard(points, 2, false, 'blank');
    _.each(symbolarr, function (symbol, index) {
        document.getElementById('playerPoints_' + index).src = 'img/num/' + symbol + '.png';
    });    
}


function Dealer() {
    this.b_init = false;
    this.hand = [];
    this.init = function() {
        this.draw();
        this.b_init = true;
    };
    this.draw = function(card) {
        addCard(this.hand, $("dvDealerCards"), card);
    };
    this.deal = function() {
        if (evalDealerHand()) {
            setTimeout("d.deal()",(750+(500*(Math.random()*1))));
        } else {
            if (p.score != "bj") {
                if (d.score == "bj") {
                    if (!p.b_insured) {
                        p.win(-1);
                    }
                    else {
                        p.win(2);
                    }
                } else if (d.score>21) {
                    p.win(1);
                } else if (p.score<22 && p.score>d.score) {
                    p.win(1);
                } else if (p.score>19 && p.score==d.score) {
                    p.win(0);
                } else {
                    p.win(-1);
                }
            } else {
                if (d.score != "bj") {
                    p.win(1.5);
                } else {
                    p.win(-1);
                }
            }
        }
    };
}
function updateBetTotal() {
    //$("dvTotal").innerHTML = "$"+parseInt(p.total);
    var symbolarr = _.flapBoard("$"+p.total, 6, false, 'blank');
    _.each(symbolarr, function (symbol, index) {
        document.getElementById('scoreCharacter_' + index).src = 'img/num/' + symbol + '.png';
    });    
}
        

function Player() {
    this.b_init = false;
    this.b_double = false;
    this.b_insured = false;
    this.b_even = false;
    this.total = 1000;
    this.bet = 0;
    this.wait = 3000;
    this.hand = [];
    this.init = function() {
        this.draw();
        d.init();
        this.draw();
        this.b_init = true;
    };
    this.draw = function(card) {
        addCard(this.hand, $("dvPlayerCards"), card);
        evalPlayerHand(this.hand, $("dvPlayerPoints"));
    };
    
    this.stand = function(i) {
        $("dvDoubleDown").style.visibility = "hidden";
        b_double_down_open = false;
        d.deal();
    };
    
    this.even_money = function(i) {
        $("dvBnrEvenMoney").style.visibility = "hidden";
        $("dvYes").style.visibility = "hidden";
        $("dvNo").style.visibility = "hidden";
        
        b_even_money_open = false;
        if (i==1) {
            p.win(1);
        } else {
            this.b_even = true;
            d.deal();
        }
    };
    
    this.insurance = function(i) {
        if (i !== 0) {
            this.b_insured = true;
            this.total -= parseInt(this.bet/2);
            updateBetTotal();
            for (var j=0;j<parseInt((this.bet/2)/min_bet);j++)
            {
                $("dvInsuranceChips").innerHTML += '<div style="position:absolute;left:'+(Math.floor(Math.random()*40))+'px;top:'+(Math.floor(Math.random()*40))+'px;"><img src="img/chip_50.gif" alt="" style="width:100px; height:82px;" border="0"/></div>';
            }
            if ((this.bet/2)%min_bet==25)
            {
                $("dvInsuranceChips").innerHTML += '<div style="position:absolute;left:'+(Math.floor(Math.random()*40))+'px;top:'+(Math.floor(Math.random()*40))+'px;"><img src="img/chip_25.gif" alt="" style="width:100px; height:82px;" border="0"/></div>';
            }
            setFocus("img_stand");
        }
        $("dvBnrInsurance").style.visibility = "hidden";
        // $("dvYes").style.visibility = "hidden";
        // $("dvNo").style.visibility = "hidden";
        b_insurance_open = false;
        b_stand_ok = true;
        b_hit_ok = true;
    /*enableButton("Hit");
        enableButton("Stand");
        enableButton("DoubleDown");
        enableButton("Info");
        enableButton("Exit");*/
    };
    
    this.hit = function() {
        $("dvDoubleDown").style.visibility = "hidden";
        this.draw();
    };
    
    this.bust = function () {
        this.win(-1);
    };
    
    this.win = function(wc) {
        if (wc === 0) {
            if(lang=="es"){
                $("dvMsg").innerHTML = "\u00A1PRESIONA! (MANO IGUAL)";
            }else{
                $("dvMsg").innerHTML = "PUSH";
                var left = $("dvMsg").style.left;
                $("dvMsg").style.left = parseInt(left.substr(0,3)) + 55 + "px";
            }
            document.getElementById('msgBox').style.visibility = "visible";
            if (p.b_double) {
                this.total += parseInt(this.bet/2);
            } else {
                this.total += parseInt(this.bet);
            }
        } else if (wc == 2) {
            $("dvMsg").innerHTML = "BLACK JACK!";
            this.total += parseInt(parseInt(this.bet)*1.5);
            document.getElementById('msgBox').style.visibility = "visible";
        } else {
            if (wc>0) {
                //$("dvMsg").innerHTML = "YOU WIN!";
                $("dvMsg").innerHTML = msg['YOU_WIN']; //MIkael
                var left = $("dvMsg").style.left;
                $("dvMsg").style.left = parseInt(left.substr(0,3)) + 25 + "px";                
                document.getElementById('msgBox').style.visibility = "visible";
                if (p.score == "bj") {
                    $("dvMsg").innerHTML = "BLACK JACK!";
                    document.getElementById('msgBox').style.visibility = "visible";
                    this.wait = parseInt(5000);
                }
                if (this.b_double) {
                    for (var i=0;i<((wc*this.bet)/min_bet)/2;i++) {
                        $("dvChips").innerHTML += '<div style="position:absolute;left:'+(Math.floor(Math.random()*40))+'px;top:'+(-80+(Math.floor(Math.random()*40)))+'px;"><img src="img/chip_50.gif" alt="" style="width:100px; height:82px;" border="0"/></div>';
                        $("dvChips").innerHTML += '<div style="position:absolute;left:'+(70+(Math.floor(Math.random()*40)))+'px;top:'+(-80+(Math.floor(Math.random()*40)))+'px;"><img src="img/chip_50.gif" alt="" style="width:100px; height:82px;" border="0"/></div>';
                    }
                } else {
                    for (var i=0;i<parseInt((wc*this.bet)/min_bet);i++)
                    {
                        $("dvChips").innerHTML += '<div style="position:absolute;left:'+(Math.floor(Math.random()*40))+'px;top:'+(-80+(Math.floor(Math.random()*40)))+'px;"><img src="img/chip_50.gif" alt="" style="width:100px; height:82px;" border="0"/></div>';
                    }
                    if ((wc*this.bet)%min_bet==25)
                    {
                        $("dvChips").innerHTML += '<div style="position:absolute;left:'+(Math.floor(Math.random()*40))+'px;top:'+(-80+(Math.floor(Math.random()*40)))+'px;"><img src="img/chip_25.gif" alt="" style="width:100px; height:82px;" border="0"/></div>';
                    }
                }
                if(b_sound)
                {
                    $("sndChip_payout").play();
                }
            } else {
                
                $("dvMsg").innerHTML = msg["DEALER_WINS"]; //"DEALER_WINS";
                document.getElementById('msgBox').style.visibility = "visible";
                //alert(msg)
                //$("dvMsg").innerHTML = "DEALER_WINS"; //Mikael
                b_stand_ok = false;
                b_hit_ok = false;
                $("dvChips").innerHTML = "";
                $("dvInsuranceChips").innerHTML = "";
                if(b_sound)
                {
                    $("sndDealerWin").play();
                }
            }
            this.total += parseInt(this.bet*(wc+1));
        }
        this.bet = parseInt(0);
        updateBetTotal();
        setTimeout("prepareNewHand()",this.wait);
        this.wait = 3000;
    };
    
    this.double_down = function() {
        if (this.total >= this.bet) {
            $("dvDoubleDown").style.visibility = "hidden";
            b_double_down_open = false;
            this.b_double = true;
            for (var i=0;i<parseInt(this.bet/min_bet);i++)
            {
                $("dvChips").innerHTML += '<div style="position:absolute;left:'+(70+(Math.floor(Math.random()*40)))+'px;top:'+(Math.floor(Math.random()*40))+'px;"><img src="img/chip_50.gif" alt="" style="width:100px; height:82px;"/></div>';
            }
            this.total -= this.bet;
            this.bet *= parseInt(2);
            updateBetTotal();
            this.draw();
            this.stand(1);
        }
    };
    
    this.raise = function() {
        if (this.bet<max_bet && this.total>=min_bet) {
            $("dvChips").innerHTML+='<div style="position:absolute;left:'+(Math.floor(Math.random()*40))+'px;top:'+(50+(Math.floor(Math.random()*40)))+'px;"><img src="img/chip_50.gif" alt="" style="width:100px; height:82px;" /></div>';
            this.bet += parseInt(min_bet);
            this.total -= parseInt(min_bet);
        }
        updateBetTotal();
    };
}



function resetTable() {
}

function prepareNewHand() {
    $("dvMsg").innerHTML = "";
    $("dvMsg").style.left = "535px";
    $("dvDealerPoints").innerHTML = "";
    $("dvPlayerPoints").innerHTML = "";
    document.getElementById('player_arrow').style.visibility = "hidden";
    document.getElementById('dealer_arrow').style.visibility = "hidden";
    document.getElementById('msgBox').style.visibility = "hidden";
    $("dvDealerCards").innerHTML = "";
    $("dvPlayerCards").innerHTML = "";
    $("dvBnrInsurance").style.visibility = "hidden";
    $("dvBnrPlayAgain").style.visibility = "hidden";
    $("dvBnrEvenMoney").style.visibility = "hidden";
    $("dvYes").style.visibility = "hidden";
    $("dvNo").style.visibility = "hidden";
    $("dvInsuranceChips").innerHTML = "";
    $("dvChips").innerHTML = "";
    $("dvBet").style.visibility = "visible";
    $("dvDeal").style.visibility = "visible";
    $("dvStand").style.visibility = "hidden";
    $("dvHit").style.visibility = "hidden";
    $("dvDoubleDown").style.visibility = "hidden";
    setFocus("img_bet");
    b_bet_ok = true;
    b_deal_ok = true;
    b_double_down_open = false;
    b_stand_ok = false;
    b_hit_ok = false;
    if (p.total <= 25) {
        //accedobroadband.redirect("gameover.html?" + accedobroadband.querystring.parameters());
        $("dvBnrPlayAgain").style.visibility = "visible";
        $("dvBtnInfo").style.visibility = "hhidden";
        $("dvBtnExit").style.visibility = "hidden";
        $("dvYes").style.visibility = "visible";
        $("dvNo").style.visibility = "visible";
        setFocus("img_yes_btn");
        b_play_again_open = true;
        b_bet_ok = false;
        b_deal_ok = false;
    /*disableButton("Hit");
        disableButton("Stand");
        disableButton("DoubleDown");
        disableButton("Info");
        disableButton("Exit");*/
    }
    d.hand = [];
    p.hand = [];
    p.b_double = false;
    p.b_insured = false;
    p.b_even = false;
}

function deal() {
    resetTable();  //@todo: empty function?
    
    if (p.bet === 0) {
        p.raise();
    }
    
    updateBetTotal();
    
    if (bj.cards.length<20) {
        bj.pile();
        bj.shuffle();
    } else if((bj.cards[15] == "") || bj.cards[15] == "undefined"){
        bj.pile();
        bj.shuffle();
    }
    
    if (p.b_init) {
        p.draw();
        d.draw();
        p.draw();
    } else {
        p.init();
    }
    
    evalDealerHand(true);
    
    if (p.score != "bj") {
        $("dvBet").style.visibility = "hidden";
        $("dvDeal").style.visibility = "hidden";
        $("dvStand").style.visibility = "visible";
        $("dvHit").style.visibility = "visible";
    }
	
    if (d.hand[0].toString().indexOf("a")>-1) {
        if (p.score == "bj") {
            $("dvBnrEvenMoney").style.visibility = "visible";
            $("dvYes").style.visibility = "visible";
            $("dvNo").style.visibility = "visible";
            b_even_money_open = true;
            setFocus("img_yes_btn");
        } else {
            if (p.total >= p.bet/2) {
                $("dvBnrInsurance").style.visibility = "visible";
                // $("dvYes").style.visibility = "visible";
                // $("dvNo").style.visibility = "visible";
                b_insurance_open = true;
                setFocus("img_insurance");
            /*b_stand_ok = false;
                b_hit_ok = false;
                disableButton("Hit");
                disableButton("Stand");
                disableButton("DoubleDown");
                disableButton("Info");
                disableButton("Exit");*/
            }
        }
    }
}

function newGame() {

    resetTable();  //@todo: empty function?
    bj.pile();
    bj.shuffle();
    p.bet = 0;
    //p.total = 100;
    p.total = parseInt(1000);
    updateBetTotal();
    prepareNewHand();
}

function keyAction(e) {
	
    
	if ( b_help_open ) {
        help_keyAction(e);
        return;
    }
    
    if ( e == KEY_BACK ) {
        accedobroadband.redirect(exitPath + "?" + accedobroadband.querystring.parameters());
    } /*else if ( e == KEY_EXIT ) {
        exitGame();
    }*/
    
    var event = e;
	
		
	
	
	
	
	
    switch (e) {
        case KEY_ENTER:
            if(b_help_open) {
                $("dvRulesFrame").style.visibility = "hidden";
                b_help_open = false;
                return;
            }
            if ( b_warning === true ) {
                b_warning = false;
            } else {
                okPressed();
            }
            break;
        
        
        case KEY_LEFT:
            if ( b_warning === true ) {
                break;
            } else {
                if ( b_sound ) {
                    playZap();
                }
                changeFocus("LEFT");
            }
            break;
        
        
        case KEY_RIGHT:
            if(b_warning === true) {
                break;
            } else {
                if(b_sound)
                {
                    playZap();
                }
                changeFocus("RIGHT");
            }
            break;
        
        
        case KEY_UP:
            if(b_warning === true) {
                break;
            } else {
                if(b_sound)
                {
                    playZap();
                }
                changeFocus("UP");
            }
            break;
        
        
        case KEY_DOWN:
            if(b_warning === true) {
                break;
            } else {
                if(b_sound)
                {
                    playZap();
                }
                changeFocus("DOWN");
            }
            break;
            


    }
}
var keyEventFunction = keyAction;

function okPressed() {
    
    switch (position) {
        case POS_EXIT:
            if (b_help_open) {
                $("dvRules").style.visibility = "hidden";
                $("dvPrevious").style.visibility = "hidden";
                $("dvNext").style.visibility = "hidden";
                b_help_open = false;
            } else {
				exitGame();
            }
            
            $("img_exit").src = "img/buttons/" + lang + "/exit1_focus.png";
            break;
        
        
        case POS_NO:	// RED
            if (b_even_money_open) {
                p.even_money(0);
            } 
            /*else if (b_insurance_open) {
                p.insurance(0);
            } */
            else if (b_play_again_open) {
                exitGame();
            }
            break;
        
        
        case POS_YES:	// GREEN
            if (b_even_money_open) {
                p.even_money(1);
            } 
            /*else if (b_insurance_open) {
                p.insurance(1);
            }*/ 
            else if (b_play_again_open) {
                b_play_again_open = false;
                $("dvBnrPlayAgain").style.visibility = "hidden";
                $("dvYes").style.visibility = "hidden";
                $("dvNo").style.visibility = "hidden";
                $("dvBtnInfo").style.visibility = "visible";
                $("dvBtnExit").style.visibility = "visible";
				/*enableButton("Hit");
                enableButton("Stand");
                enableButton("DoubleDown");
                enableButton("Info");
                enableButton("Exit");*/
                newGame();
            }
            break;       
        
        case POS_DOUBLE_DOWN:	// GREEN
            if (b_double_down_open) {
                $("img_double_down").src = "img/buttons/"+ lang + "/double_focus.png";
                p.double_down();
            }
            break;
        
        case POS_INS:
            if (b_insurance_open) {
                p.insurance(1);
            }
            break;
        
        case POS_BET_STAND:	// YELLOW
            if (b_insurance_open) {
                p.insurance(0);
            }
            if (b_bet_ok) {
                $("img_bet").src = "img/buttons/"+ lang + "/bet_focus.png";
                p.raise();
                if(b_sound)
                {
                    $("sndBet").play();
                }
            } else if (b_stand_ok) {
                $("img_stand").src = "img/buttons/"+ lang + "/stand_focus.png";
                b_stand_ok = false;
                b_hit_ok = false;
                p.stand();
            }
            break;
        
        
        case POS_DEAL_HIT:	// BLUE
            if (b_insurance_open) {
                p.insurance(0);
            }
            if (b_deal_ok) {
                $("img_deal").src = "img/buttons/"+ lang + "/deal_focus.png";
                b_deal_ok = false;
                b_bet_ok = false;
                b_stand_ok = true;
                b_hit_ok = true;
                setFocus("img_hit");
                if(b_sound)
                {
                    $("sndDeal").play();
                }
                deal();
            } else if (b_hit_ok) {
                $("img_hit").src = "img/buttons/"+ lang + "/hit_focus.png";
                if(b_sound)
                {
                    $("sndHit").play();
                }
                p.hit();
            }
            break;
        
        
        case POS_INFO:
            /*$("dvRules").style.visibility = "visible";
            b_help_open = true;
            $("dvNext").style.visibility = "visible";
            setFocus("img_next");
            
            $("img_exit").src = "img/bj/btn_back0_" + lang + ".gif";*/
            //accedobroadband.redirect("help.html?" + accedobroadband.querystring.parameters());
            help_init();
            $("dvRulesFrame").style.visibility = "visible";
            b_help_open=true;
            break;
        
        
        
        case POS_RULES_PREVIOUS:
            $("img_rules").src = "img/text/" + lang + "/rules0.png";
            $("dvPrevious").style.visibility = "hidden";
            $("dvNext").style.visibility = "visible";
            setFocus("img_next");
            break;
        
        
        case POS_RULES_NEXT:
            $("img_rules").src = "img/text/" + lang + "/rules1.png";
            $("dvPrevious").style.visibility = "visible";
            $("dvNext").style.visibility = "hidden";
            setFocus("img_previous");
            break;		
    }
}




function changeFocus(direction) {
    
    switch(direction) {
        
        case "LEFT":
			
            if(b_help_open) {
                if(position == POS_RULES_NEXT) {
                    $("img_rules").src = "img/text/" + lang + "/rules1.png";
                    $("img_previous").style.visibility = "visible";
                    $("img_next").style.visibility = "hidden";
                    setFocus_help("img_previous");
                } 
               
            } else {
                if(position == POS_EXIT) {
                    setFocus("img_info");
                } else if(position == POS_INFO) {
					if (b_insurance_open)
					{
						setFocus("img_insurance");
					}
					else if (b_double_down_open)
					{
						setFocus("img_double_down");
					}
					else if(b_deal_ok)
					{
						setFocus("img_deal");
					}
					else if(b_hit_ok)
					{
						setFocus("img_hit");
					}
					
				}else if(position == POS_DOUBLE_DOWN || position == POS_INS) {
                    if(b_deal_ok)
                    {
                        setFocus("img_deal");
                    }
                    else if(b_hit_ok)
                    {
                        setFocus("img_hit");
                    }
                } else if(position == POS_DEAL_HIT) {
                    if(b_bet_ok)
                    {
                        setFocus("img_bet");
                    }
                    else if(b_stand_ok)
                    {
                        setFocus("img_stand");
                    }
                } else if(position == POS_BET_STAND) {
                    if(b_svp)
                    {
                        setFocus("my_svp");
                    }
                } else if(position == POS_YES) {
                    setFocus("img_no_btn");
                }
            }
            break;
        
        
        case "RIGHT":
            if(b_help_open) {
                if(position == POS_RULES_PREVIOUS) {
                    $("img_rules").src = "img/text/" + lang + "/rules0.png";
                    $("img_previous").style.visibility = "hidden";
                    $("img_next").style.visibility = "visible";
                    setFocus_help("img_next");
                } 
                
            } else {
                if(position == POS_BET_STAND) {
                    
                    if(b_deal_ok)
                    {
                        setFocus("img_deal");
                    }
                    else if(b_hit_ok)
                    {
                        setFocus("img_hit");
                    }
                } else if(position == POS_DEAL_HIT) {
                    if (b_insurance_open)
                    {
                        setFocus("img_insurance");
                    }
                    else if (b_double_down_open)
                    {
                        setFocus("img_double_down");
                    }
					else
					{
						setFocus("img_info");
					}
                } else if(position == POS_DOUBLE_DOWN || position == POS_INS) {
					setFocus("img_info");					
                } else if(position == POS_INFO) {
                    setFocus("img_exit");
                } else if(position == POS_NO) {
                    setFocus("img_yes_btn");
                } else if(position == POS_SVP) {
                    if(b_bet_ok)
                    {
                        setFocus("img_bet");
                    }
                    else if(b_stand_ok)
                    {
                        setFocus("img_stand");
                    }
                }
            }
            break;
        
        
        case "UP":
            if(b_help_open) {
                if(position == POS_RULES_PREVIOUS) {
                    setFocus_help("img_exit");
                    dropFocus_help("img_previous");
                } else if(position == POS_RULES_NEXT) {
                    setFocus_help("img_exit");
                    dropFocus_help("img_next");
                }
            } else {
                if(position == POS_YES || position == POS_NO)
                {
                    break;
                }
                if(position == POS_BET_STAND || position == POS_DEAL_HIT) {
                    if (b_double_down_open)
                    {
                        setFocus("img_double_down");
                    }
                    else
                    {
                        setFocus("img_info");
                    }
                } else
				{
                    setFocus("img_info");
                }
            }
            break;
        
        case "DOWN":
            if(b_help_open) {
                if (position == POS_EXIT) {
                    dropFocus_help("img_exit");
                    if($("img_previous").style.visibility == "visible" || $("dvPrevious").style.visibility == "visible") {
                        setFocus_help("img_previous");
                    } else if($("img_next").style.visibility == "visible" || $("dvNext").style.visibility == "visible") {
                        setFocus_help("img_next");
                    }
                }
            } else {
                if(position == POS_YES || position == POS_NO)
                {
                    break;
                }
                if(position == POS_INFO || position == POS_EXIT) {
                    if (b_insurance_open)
                    {
                        setFocus("img_insurance");
                    }
                    else if (b_double_down_open)
                    {
                        setFocus("img_double_down");
                    }
                    else if(b_hit_ok)
                    {
                        setFocus("img_hit");
                    }
                    else if(b_deal_ok)
                    {
                        setFocus("img_deal");
                    }
                } else if(position == POS_DOUBLE_DOWN) {
                    if(b_hit_ok)
                    {
                        setFocus("img_hit");
                    }
                    else if(b_deal_ok)
                    {
                        setFocus("img_deal");
                    }
                }
            }
            break;
        
        
    }
}



function setFocus(el) {
    
    dropFocus();
    
    switch(el) {
        case "img_exit":
            
            if (b_help_open)
            //$(el).src = "img/bj/btn_e1_" + lang + ".png";
            {
                $(el).src = "img/buttons/"+ lang + "/back_focus.png";
            }
            else{
                //$(el).src = "img/bj/btn_exit1_" + lang + ".png";
                $(el).src = "img/buttons/"+ lang + "/exit1_focus.png";
            }
            position = POS_EXIT;
            break;
        case "img_info":
            $(el).src = $(el).src = "img/buttons/"+ lang + "/info_focus.png";
            position = POS_INFO;
            break;
        case "img_yes_btn":
            $(el).src = "img/buttons/"+ lang + "/yes_focus.png";
            position = POS_YES;
            break;
        case "img_no_btn":
            $(el).src = "img/buttons/"+ lang + "/no_focus.png";
            position = POS_NO;
            break;
        case "img_bet":
            $(el).src = "img/buttons/"+ lang + "/bet_focus.png";
            position = POS_BET_STAND;
            break;
        case "img_stand":
            $(el).src = "img/buttons/"+ lang + "/stand_focus.png";
            position = POS_BET_STAND;
            break;
        case "img_deal":
            $(el).src = "img/buttons/"+ lang + "/deal_focus.png";
            position = POS_DEAL_HIT;
            break;
        case "img_hit":
            $(el).src = "img/buttons/"+ lang + "/hit_focus.png";
            position = POS_DEAL_HIT;
            break;
        case "img_double_down":
            $(el).src = "img/buttons/"+ lang + "/double_focus.png";
            position = POS_DOUBLE_DOWN;
            break;
        case "img_insurance":
            $(el).src = "img/buttons/"+ lang + "/insurance_focus.png";
            position = POS_INS;
            break;
        /* case "img_previous":
            $(el).src = "img/bj/btn_previous1_" + lang + ".gif";
            position = POS_RULES_PREVIOUS;
            break;
        case "img_next":
            $(el).src = "img/bj/btn_next1_" + lang + ".gif";
            position = POS_RULES_NEXT;
            break;
*/
        case "img_exit2":
            $(el).src = "img/buttons/"+ lang + "/back_focus.png";
            position = POS_EXIT;
            break;
        case "img_previous":
            $(el).src = "img/buttons/"+ lang + "/previous_focus.png";
            position = POS_RULES_PREVIOUS;
            break;
        case "img_next":
            $(el).src = "img/buttons/"+ lang + "/next_focus.png";
            position = POS_RULES_NEXT;
            break;
    }
}




function dropFocus() {
    
    if (b_help_open){ 
        $("img_exit").src = "img/buttons/"+ lang + "/back_unfocus.png";
    } else {
        $("img_exit").src = "img/buttons/"+ lang + "/exit1_unfocus.png";
    }

    $("img_info").src = "img/buttons/"+ lang + "/info_unfocus.png";
    $("img_yes_btn").src = "img/buttons/"+ lang + "/yes_unfocus.png";
    $("img_no_btn").src = "img/buttons/"+ lang + "/no_unfocus.png";
    $("img_bet").src = "img/buttons/"+ lang + "/bet_unfocus.png";
    $("img_stand").src = "img/buttons/"+ lang + "/stand_unfocus.png";
    $("img_deal").src = "img/buttons/"+ lang + "/deal_unfocus.png";
    $("img_hit").src = "img/buttons/"+ lang + "/hit_unfocus.png";
    $("img_double_down").src = "img/buttons/"+ lang + "/double_unfocus.png";
    $("img_insurance").src = "img/buttons/"+ lang + "/insurance_unfocus.png";
	//$("img_previous").src = "img/bj/btn_previous0_" + lang + ".gif";
    //$("img_next").src = "img/bj/btn_next0_" + lang + ".gif";
    $("img_exit2").src = "img/buttons/" + lang + "/back_unfocus.png"; //tclchan
    $("img_previous").src = "img/blank.gif";
    $("img_next").src = "img/blank.gif";
    
}





function init_lang() {
    
    // $("img_rules").src = "img/bj/rules0_" + lang + ".jpg";
    $("img_info").src  = "img/buttons/"+ lang + "/info_unfocus.png";
    $("img_info_disabler").src  = "img/buttons/"+ lang + "/info_unfocus.png";
    $("img_exit").src  = "img/buttons/"+ lang + "/exit1_unfocus.png";
    $("img_exit_disabler").src  = "img/buttons/"+ lang + "/exit1_unfocus.png";
    $("img_yes_btn").src  = "img/buttons/"+ lang + "/yes_unfocus.png";
    $("img_no_btn").src  = "img/buttons/"+ lang + "/no_unfocus.png";
    //$("img_previous").src  = "img/bj/btn_previous0_" + lang + ".gif";
    //$("img_next").src  = "img/bj/btn_next0_" + lang + ".gif";
    $("img_play_again").src  = "img/text/"+ lang + "/bg_gameover.jpg";
    $("img_even_money").src = "img/text/"+ lang + "/bg_even_money.jpg";
    
}



function init(){
    
    initiateKeyHandler();

    init_lang();
    switch(lang) {
        case "en":
            msg['DEALER_WINS'] = "DEALER WINS";
            msg['YOU_WIN'] = 'YOU WIN!';
            break;
        case "de":
            msg['DEALER_WINS'] = "DER CROUPIER GEWINNT";
            msg['YOU_WIN'] = 'SIE GEWINNEN!';
            break;
        case "fr":
            //msg['DEALER_WINS'] = "LA BANQUE A GAGN&#201;";
            //msg['YOU_WIN'] = 'VOUS AVEZ GAGN&#201;!';
            msg['DEALER_WINS'] = "LA BANQUE A GAGN&#201;";
            msg['YOU_WIN'] = 'VOUS AVEZ GAGN&#201; !';
            break;
        case "nl":
            msg['DEALER_WINS'] = "DE GEVER HEEFT GEWONNEN";
            msg['YOU_WIN'] = 'JE HEBT GEWONNEN!';
            break;
        case "es":
            msg['DEALER_WINS'] = "\u00A1EL DEALER GANA!";
            msg['YOU_WIN'] = "\u00A1GANASTE!";
    } 
       
    $("dvGame").style.visibility = "visible";
    
    bj = new Shoe(6);
    bj.pile();
    bj.shuffle();
    
    d = new Dealer();
    p = new Player();
    
    setFocus("img_bet");
    
} 





/*
 *	btn = the button you wish to disable.
 *
 *	possible values:	Bet
 *				Deal
 *				Hit
 *				Stand
 *				DoubleDown
 *				Info
 *				Exit
 *
 */
function disableButton(btn) {
    $("dv"+btn+"Disabler").style.visibility = "visible";
}

function enableButton(btn) {
    $("dv"+btn+"Disabler").style.visibility = "hidden";
}


function playZap() {
    if(zap == 4)
    {
        zap = 1;
    }
    $("sndZap"+zap).play();
    zap++;
}

function help_keyAction(event) {

    var goBackToGame = function() {
        $("dvRulesFrame").style.visibility = "hidden";
        $("dvRules").style.visibility = "hidden";
        $("img_exit2").style.visibility = "hidden";
        $("img_rules").src = "img/blank.gif";
        b_help_open = false;
        position = POS_INFO;
        setFocus("img_info");
    };

    if ( event == KEY_BACK ) {
        goBackToGame();
    }

    if (event === KEY_ENTER) {
        if(position === POS_EXIT) {
            goBackToGame();
        } else if(position === POS_RULES_PREVIOUS) {
            //keyAction(KEY_LEFT)
            if (current_page == 1) {
                current_page--;
                $("img_rules").src = "img/text/" + lang + "/rules0.png";
                $("img_previous").style.visibility = "hidden";
                $("dvPrevious").style.visibility = "hidden";
                $("img_next").style.visibility = "visible";
                $("dvNext").style.visibility = "visible";
                setFocus_help("img_next");
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
                setFocus_help("img_previous");
            }
        }
			
    }
    if (event === KEY_BLUE) {
        alert($("img_previous").src);
    }
    else if (event === KEY_LEFT) {
    /*$("img_rules").src = "img/bj/rules0_" + lang + ".png";
		$("dvPrevious").style.visibility = "hidden";
		$("dvNext").style.visibility = "visible";
		setFocus("img_next");*/
    }
    else if (event === KEY_RIGHT) {
    /*$("img_rules").src = "img/bj/rules1_" + lang + ".png";
		$("dvPrevious").style.visibility = "visible";
		$("dvNext").style.visibility = "hidden";
		setFocus("img_previous");*/
    }
    else if (event === KEY_UP) {
        setFocus_help("img_exit2");
        dropFocus_help("img_previous");
        dropFocus_help("img_next");
    }
    else if (event === KEY_DOWN) {
        if (position == POS_EXIT)
        {
            dropFocus_help("img_exit2");
        }
        if($("img_previous").style.visibility == "visible") {
            setFocus_help("img_previous");
        } else if($("img_next").style.visibility == "visible") {
            setFocus_help("img_next");
        }
    }
}

function help_init() {
    dropFocus();
    current_page = 0;
    $("img_rules").src = "img/text/" + lang + "/rules0.png";
    /*$("img_previous").src = "img/buttons/" + lang + "/previous_unfocus.png";
	$("img_next").src = "img/buttons/" + lang + "/next_focus.png"; */
    $("img_exit2").src = "img/buttons/" + lang + "/back_unfocus.png";
    $("img_rules").style.visibility = "visible";
    $("dvRules").style.visibility = "visible";
    $("img_previous").style.visibility = "hidden";
    $("dvPrevious").style.visibility = "hidden";
    $("img_next").style.visibility = "visible";
    $("dvNext").style.visibility = "visible";
    $("img_exit2").style.visibility = "visible";
    setFocus_help("img_next");
    initiateKeyHandler();
}

function setFocus_help(el) {
    switch(el) {
        case "img_exit2":
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

function dropFocus_help(el) {
    switch(el) {
        case "img_exit2":
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

/*function help_keyAction(event) {
    if (event === KEY_ENTER) {
		if(position === POS_EXIT) {
			//accedobroadband.redirect("blackjack.html?" + accedobroadband.querystring.parameters());
				$("dvRulesFrame").style.visibility = "hidden";
                                $("dvRules").style.visibility = "hidden";
                                $("img_rules").src = "img/blank.gif";
				b_help_open = false;
                                position = POS_INFO;
                                setFocus("img_info");
		} else if(position === POS_RULES_PREVIOUS) {
			keyAction(KEY_LEFT)
		} else if(position === POS_RULES_NEXT) {
			keyAction(KEY_RIGHT)
		}

	}
	if (event === KEY_BLUE) {
		//alert($("img_previous").src);
	}
	else if (event === KEY_LEFT) {
		$("img_rules").src = "img/bj/rules0_" + lang + ".jpg";
		$("dvPrevious").style.visibility = "hidden";
		$("dvNext").style.visibility = "visible";
		setFocus("img_next");
	}
	else if (event === KEY_RIGHT) {
		$("img_rules").src = "img/bj/rules1_" + lang + ".jpg";
		$("dvPrevious").style.visibility = "visible";
		$("dvNext").style.visibility = "hidden";
		setFocus("img_previous");
	}
	else if (event === KEY_UP) {
		setFocus("img_exit2");
	}
	else if (event === KEY_DOWN) {
		if($("dvPrevious").style.visibility == "visible") {
			setFocus("img_previous");
		} else if($("dvNext").style.visibility == "visible") {
			setFocus("img_next");
		}
	}
}

function help_init() {
    
	//$("img_rules").style.visibility = "visible";
	$("img_previous").style.visibility = "visible";
	$("img_next").style.visibility = "visible";
        $("dvRules").style.visibility = "visible";
	$("img_rules").src = "img/bj/rules0_" + lang + ".jpg";
	$("img_previous").src = "img/bj/btn_previous1_" + lang + ".gif";
	$("img_next").src = "img/bj/btn_next1_" + lang + ".gif";
	setFocus("img_next");
	//initiateKeyHandler();
}*/