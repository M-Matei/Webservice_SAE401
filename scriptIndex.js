document.addEventListener("DOMContentLoaded", (event) => {

  document.getElementById("resetButton").addEventListener("click", function() {
    location.reload();
  });

  document.getElementById("resetButton2").addEventListener("click", function() {
    location.reload();
  });

  $.ajax({
    url: "https://dev-22001492.users.info.unicaen.fr/bikestores/brands",
    type: "GET",
    dataType: "json",
    success: function(response) {
        if (response.hasOwnProperty("brands") && Array.isArray(response.brands)) {
            $.each(response.brands, function(index, brand) {
                $("<option>").val(brand.brand_name).text(brand.brand_name).appendTo("#filterBrand");
            });
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
    }
  });

  $.ajax({
    url: "https://dev-22001492.users.info.unicaen.fr/bikestores/categories",
    type: "GET",
    dataType: "json",
    success: function(response) {
        if (response.hasOwnProperty("categories") && Array.isArray(response.categories)) {
            $.each(response.categories, function(index, category) {
                $("<option>").val(category.category_name).text(category.category_name).appendTo("#filterCategory");
            });
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
    }
  });


$.ajax({
    url: "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/1",
    type: "GET",
    dataType: "json",
    success: function(response) {
      $("#SCB").text("Store name : "+ response.store_name +
      " at Postal address : " + response.street + ", " + 
      response.zip_code + " " + response.city + " (" + response.state + ") Contact us on " + response.phone);          
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
    }
  });

  $.ajax({
    url: "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/2",
    type: "GET",
    dataType: "json",
    success: function(response) {
      $("#BB").text("Store name : "+ response.store_name +
      " at Postal address : " + response.street + ", " + 
      response.zip_code + " " + response.city + " (" + response.state + ") Contact us on " + response.phone);                   
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
    }
  });

  $.ajax({
    url: "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/3",
    type: "GET",
    dataType: "json",
    success: function(response) {
      $("#RB").text("Store name : "+ response.store_name +
      " at Postal address : " + response.street + ", " + 
      response.zip_code + " " + response.city + " (" + response.state + ") Contact us on " + response.phone);                  
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
    }
  });

  function displayProducts(products) {
    $("#productsTable").empty(); // Efface le contenu actuel du tableau
    $.each(products, function(index, product) {
        var row = $("<tr>");
        var cell = $("<td>").text(product.product_name);
        row.append(cell);
        var cell2 = $("<td>").text(product.brand);
        row.append(cell2);
        var cell3 = $("<td>").text(product.category);
        row.append(cell3);
        var cell4 = $("<td>").text(product.model_year);
        row.append(cell4);
        var cell5 = $("<td>").text(product.list_price);
        row.append(cell5);
        $("#productsTable").append(row);
    });
  }

  function loadProducts(startIndex, urlRequest, boxInfo) {
    $.ajax({
        url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
        type: "GET",
        dataType: "json",
        success: function(response) {
            if (response.hasOwnProperty("products") && Array.isArray(response.products)) {
                var products = response.products.slice(startIndex, startIndex + pageSize);
                displayProducts(products);
                var successBox = $("<div>").text("Successful operation").css({
                  "background-color": "green",
                  "color": "white",
                  "padding": "10px",
                  "margin": "10px"
              });
              $(boxInfo).append(successBox);
            } else {
              var errorMessage = response.status_message;
              var errorBox = $("<div>").text(errorMessage).css({
                "background-color": "red",
                "color": "white",
                "padding": "10px",
                "margin": "10px"
            });
            $(boxInfo).append(errorBox);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
        }
    });
  }

  var startIndex = 0;
  var pageSize = 15;  // Nombre de produits à afficher par page
  var actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/products" ;

  loadProducts(startIndex, actualUrl, "");

    $("#previousButton").click(function() {
        if (startIndex - pageSize >= 0) {
            startIndex -= pageSize;
            loadProducts(startIndex, actualUrl, "");
        }
    });

    $("#nextButton").click(function() {
        startIndex += pageSize;
        loadProducts(startIndex, actualUrl, "");
    });


    document.getElementById("filterBy").addEventListener("click", () => {
      var nbFilter = $("input[name='radioFilter']:checked").val();
      let brandFilter = $("#filterBrand").val();
      let categoryFilter = $("#filterCategory").val();
      let yearFilter = parseInt($("#filterYear").val());
      let priceFiltermin = parseInt($("#filterPriceMin").val());
      let priceFiltermax= parseInt($('#filterPriceMax').val());
      if (nbFilter === "all"){
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/custom-filter/"+encodeURIComponent(brandFilter.replace(/ /g, "%20"))+"/"+encodeURIComponent(categoryFilter.replace(/ /g, "%20"))+"/"+yearFilter+"/"+priceFiltermin+"/"+priceFiltermax;
        loadProducts(startIndex, actualUrl,"#FilterBox");
      } else if (nbFilter === "one"){
        if ($("#filterBrand").val() !== null){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-brand/"+encodeURIComponent(brandFilter.replace(/ /g, "%20"));
        } else if ($("#filterCategory").val() !== null){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-category/"+encodeURIComponent(categoryFilter.replace(/ /g, "%20"));
        } else if (!isNaN(parseInt($("#filterPriceMax").val()))){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-prices/"+priceFiltermin+"/"+priceFiltermax ;
        } else if (!isNaN($("#filterYear").val())){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-year/"+yearFilter ;
        }
        loadProducts(startIndex, actualUrl,"#FilterBox");
      }
    });

    document.getElementById("sortBy").addEventListener("click", () => {
      var column = $("input[name='radioSort']:checked").val();
      var order = $("input[name='radioOrder']:checked").val();
      actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/products/"+column+"/"+order ;
      loadProducts(startIndex, actualUrl,"#SortBox");
    });

    document.getElementById("filterBy").addEventListener("click", () => {
      var nbFilter = $("input[name='radioSort']:checked").val();
      if (nbFilter === "all"){
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/custom-filter/"+encodeURIComponent(brandFilter.replace(/ /g, "%20"))+"/"+encodeURIComponent(categoryFilter.replace(/ /g, "%20"))+"/"+yearFilter+"/"+priceFiltermin+"/"+priceFiltermax;
        loadProducts(startIndex, actualUrl, "#FilterBox");
      } else if (nbFilter === "one"){
        if ($("#filterBrand").val() !== null){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-brand/"+encodeURIComponent(brandFilter.replace(/ /g, "%20"));
        } else if ($("#filterCategory").val() !== null){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-category/"+encodeURIComponent(categoryFilter.replace(/ /g, "%20"));
        } else if (!isNaN(parseInt($("#filterPriceMax").val()))){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-prices/"+priceFiltermin+"/"+priceFiltermax ;
        } else if (!isNaN($("#filterYear").val())){
          actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/filter-year/"+yearFilter ;
        }
        loadProducts(startIndex, actualUrl,"#FilterBox");
      }
    });

});
