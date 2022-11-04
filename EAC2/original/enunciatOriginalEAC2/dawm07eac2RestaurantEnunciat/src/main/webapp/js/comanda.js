$(document).ready(function () {
    /*
     * MATERIAZLIZE
     */
    $('ul.tabs').tabs('select_tab', 'test4');
    $('.chips').material_chip();
    $('.chips-initial').material_chip({
        data: [{tag: 'Apple'}, {tag: 'Microsoft'}, {tag: 'Google'}]
    });
    $('.chips-placeholder').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag'
    });
    $('.chips').on('chip.add', function (e, chip) {
        alert("on add");
        alert(chip.tag);
        $('.chips-initial').material_chip('data').forEach(function (untag) {
            alert(untag.tag);
        });
    });

    $('.chips').on('chip.delete', function (e, chip) {
        alert("on delete");
    });

    $('.chips').on('chip.select', function (e, chip) {
        alert("on select");
    });
    $(".button-collapse").sideNav();
    $('.modal-trigger').leanModal();
    /*
     * END MATERIALIZE
     */


    var articlesComanda = $("#articlesComanda");
    var servletURL = "comanda?action=articlesComandaList";
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "json",
        async: true,
        url: servletURL,
        success: function (data) {
            var myHtml = renderArticlesComanda(data);
            articlesComanda.html(myHtml);
            var dades = calculTotalsLlista(data);
            $("#quantitat-article").text(dades[0]);
            $("#total-article").text(dades[1]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.info('in error');
            console.log(jqXHR, textStatus, errorThrown);
            alert("You can not send Cross Domain AJAX requests: " + errorThrown);
        }
    });
});
$(document).on('click', '[class*="deleteArticle"]', function () {
    var article = $(this).attr("id");

    var servletURL = "comanda?action=deleteArticle&article=" + article;
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "json",
        async: true,
        url: servletURL,
        success: function (data) {
            window.location.href = "comanda.html";

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.info('in error');
            console.log(jqXHR, textStatus, errorThrown);
            alert("You can not send Cross Domain AJAX requests: " + errorThrown);
        }
    });
});



function renderArticlesComanda(data) {
    var myHtml = "";
    $.each(data.jsonArray, function (index) {
        myHtml += '<div class="col s12 m12 l12"> <div class="card grey lighten-4 hoverable">';
        myHtml += renderArticle(data.jsonArray[index]);
        myHtml += '</div></div>';
    });
    return myHtml;
}

function renderArticle(dataArticle) {
    //TODO si stock és 0
    var myHtmlP = "";
    var article = "";
    var preu = 0.0;
    var quantitat = 0;
    var preuParcial = 0;
    $.each(dataArticle, function (key, value) {
        if (key == 'name') {
            article = value;
        }
        if (key == 'preu') {
            preu = parseFloat(value);
        }
        if (key == 'quantitat') {
            quantitat = parseInt(value);
            preuParcial = quantitat * preu;
        }
    });
 
    myHtmlP +='<div class="card-panel grey lighten-5 z-depth-1 hoverable"><div class="row valign-wrapper">';
    myHtmlP += '<div class="col s2"><img  class="circle responsive-img" src="img/' + article + '.jpg"/></div>';
    myHtmlP += '<div class="col s10">\n\
                <div class="chip"><h6>Article: <span id="name-' + article + '">' + article + '</h6></div>';
    myHtmlP += '<div class="chip"><h6>Preu: <span id="preu-' + article + '">' + preu + '</h6></div>';
    myHtmlP += '<div class="chip"><h6>Quantitat: <span id="quantitat-' + article + '">' + quantitat + '</span></h6></div>';
    myHtmlP += '<div class="chip"><h6>Preu Parcial: <span id="preuParcial-' + article + '">' + preuParcial + '</span></h6></div></div>';
    myHtmlP += '<div class="card-action right-align"><a class ="deleteArticle" href="#" id="' + article + '">Eliminar</a>';
    myHtmlP += '</div></div></div>';
    return myHtmlP;
}

function calculTotalsLlista(data){
    var dades = [0,0.0];
     $.each(data.jsonArray, function (index) {
        
        var article = data.jsonArray[index];
        var m = article["afegit"];
        var quant = article["quantitat"];
        var preu = article["preu"];
        if (m == "SI"){
            dades[0] = dades[0] + 1;
            dades[1] = dades[1] + parseFloat(quant * preu);
        }
     });
    
  
    return dades;
}


