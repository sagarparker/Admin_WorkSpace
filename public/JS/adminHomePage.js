$(window).on('load',function(){
    $(".frlbox").show();
    $(".clbox").hide();
    $(".wstbox").hide();
    $(".prjbox").hide();
});

function freelancer(){
    $(".frlbox").show();
    $(".clbox").hide();
    $(".wstbox").hide();
    $(".prjbox").hide();
}

function client(){
    $(".frlbox").hide();
    $(".clbox").show();
    $(".wstbox").hide();
    $(".prjbox").hide();
}

function wst(){
    $(".frlbox").hide();
    $(".clbox").hide();
    $(".wstbox").show();
    $(".prjbox").hide();
}

function prj(){
    $(".frlbox").hide();
    $(".clbox").hide();
    $(".wstbox").hide();
    $(".prjbox").show();
}