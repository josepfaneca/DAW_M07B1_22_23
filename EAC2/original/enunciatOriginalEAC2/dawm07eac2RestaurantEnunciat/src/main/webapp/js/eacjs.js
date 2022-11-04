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


    var articles = $("#articles");
    var servletURL = "Carta?action=listArticles";
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "json",
        async: true,
        url: servletURL,
        success: function (data) {
            var myHtml = renderListProducts(data);
            articles.html(myHtml);
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

  //p3//
    var servletURL = "user?action=formUser";
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "json",
        async: true,
        url: servletURL,
        success: function (data) {
            $("#username").html("<h5>Comanda de l'usuari: " + data.user +'</h5>');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.info('in error');
            console.log(jqXHR, textStatus, errorThrown);
        }
    });


});
$(document).on('click', '[class*="quantitat"]', function () {
    var articleQuantitat = $(this).attr("id").split("-");
    var article = articleQuantitat[0];
    var quantitat = articleQuantitat[1];
    var afegir = $(this.parentElement);
    var servletURL = "Carta?action=addArticleComanda&article=" + article + "&quantitat=" + quantitat;
    $.ajax({
        type: "GET",
        crossDomain: true,
        dataType: "json",
        async: true,
        url: servletURL,
        success: function (data) {
            
            afegir.hide();
            $("#check-" + data.articleAfegit).show();
            $("#preu-" + data.articleAfegit).text(data.preuArticle);
            $("#quantitat-" + data.articleAfegit).text(data.quantitatArticle);
            $("#preuparcial-" + data.articleAfegit).text(data.quantitatArticle * data.preuArticle);

            calculTotals(data);
            

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.info('in error');
            console.log(jqXHR, textStatus, errorThrown);
            alert("You can not send Cross Domain AJAX requests: " + errorThrown);
        }
    });
});



function renderListProducts(data) {
    var myHtml = "";
    $.each(data.jsonArray, function (index) {
        myHtml += '<div class="col s12 m3 l3"> <div class="card grey lighten-4 hoverable">';
        myHtml += renderArticle(data.jsonArray[index]);
        myHtml += '</div></div>';
    });
    return myHtml;
}

function renderArticle(dataArticle) {
    var myHtmlP = "";
    var article = "";
    var preu = 0;
    var quantity = 0;
    var preuParcial = 0.0;
    var afegit = false;
    $.each(dataArticle, function (key, value) {
        if (key == 'name') {
            article = value;
        }
        if (key == 'preu') {
            preu = parseInt(value);
        }
        if (key == 'quantitat') {
            quantity = parseInt(value);
        }
        if (key == 'preuparcial') {
            preuParcial = parseFloat(value);
        }
        if (key == 'afegit') {
            if (value == 'SI') {
                afegit = true;
            } else {
                afegit = false;
            }
        }
    });
    myHtmlP += '<div class="card-image"><img src="img/' + article + '.jpg"/><span class="card-title">' + article + '</span></div>';
    myHtmlP += '<div class="card-content"><div class="chip"><h6>Preu: <span id="preu-' + article + '">' + preu + '</h6></div>';
    myHtmlP += '<div class="chip"><h6>Quantitat: <span id="quantitat-' + article + '">' + quantity + '</h6></div>';
    myHtmlP += '<div class="chip"><h6>Preu parcial: <span id="preuparcial-' + article + '">' + preuParcial + '</h6></div></div>';
    
    if (afegit) {
        myHtmlP += '<div class="card-action right-align">';
        myHtmlP += '<img id ="check-' + article + '" style="width: 10px;" src="img/check.png"/></div>';

    } else {
        myHtmlP += '<div class="card-action right-align"><div>';
       for (var i = 1; i <= 5; i++){
        myHtmlP += '<a class ="quantitat" href="#" id="' + article + '-' +i+'">'+i+'</a>';
       }
        myHtmlP += '</div><img id ="check-' + article + '" style="display: none;width: 10px;" src="img/check.png"/></div>';
    }

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

function calculTotals(data) {
    var subtotal = parseFloat(document.getElementById('total-article').innerHTML);
    var num = parseInt(document.getElementById('quantitat-article').innerHTML);
    $("#quantitat-article").text(num + data.quantitatArticle);
    $("#total-article").text(subtotal + (data.preuArticle * data.quantitatArticle)); 
}