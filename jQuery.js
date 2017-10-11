$(document).ready(function() {
    
    var size = 62.5;

    //shake dice when roll dice button clicked
    $("#rollBtn").click(function(){
        $("#roll").effect( "shake");
    });
    
    
    //---------- Change Back Ground Colours ------------
    $("#grey").click(function(){
        $("body").css("background-color","#C8C8C8");
    });
    
    $("#red").click(function(){
        $("body").css("background-color","#3385ff");
    });
    
    $("#white").click(function(){
        $("body").css("background-color","white");
    });
    
    $("#other").click(function(){
        var other = prompt("Enter hex value of colour including '#'");
        $("body").css("background-color", other);
    });
    
    //---------- Change Font size ------------
    $("#default").click(function(){
        $("html").css("font-size","62.5%");
        $(".button").css("font-size","11px");
        $(".flaps").css("font-size","2rem");
    });
    
    $("#up").click(function(){
        $("html").css("font-size","+=.5");
        $(".button").css("font-size","+=.5");
        $(".flaps").css("font-size","+=.5");
    });
    
    $("#down").click(function(){
        $("html").css("font-size","-=.5");
        $(".button").css("font-size","-=.5");
        $(".flaps").css("font-size","-=.5");
    });
    
    //---------- Show Hide Menu ------------
    $("#menu-icon").click(function(){
        $("#nav > li").toggle();
        
    });
    
    
				
});