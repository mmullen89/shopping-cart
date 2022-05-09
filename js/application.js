var sum = function (acc, x) { return acc + x; };

var updateSubtotal = function(element) {
  var quantity = parseInt($(element).find('.quantity input').val());
  var price = parseFloat($(element).find('.price').text().replace(/\$/,""));

  var subtotal = Math.round((quantity * price)*100)/100;
  $(element).children('.subtotal').html("$"+subtotal);
  return subtotal;
}

var updatePrices = function() {
  var totalPrice = [];
  $('tbody tr').each(function (i, element) {
    var subtotal = updateSubtotal(element);
    totalPrice.push(subtotal);
  });

  var total = totalPrice.reduce(sum);
  total = Math.round(total*100)/100;
  $('#totalValue').html(total);
}

$(document).ready(function () {
  updatePrices();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updatePrices();
  });

  var timeout;
  $(document).on('input', 'tr .quantity', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePrices();
    }, 500);
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var itemName = $(this).children('.itemName').val();
    var itemPrice = $(this).children('.itemPrice').val();

    $('tbody').append('<tr>'+
    '<td class="name">' + itemName + '</td>' +
    '<td class = "price"> $' + itemPrice + '</td>' + 
    '<td class = "quantity"><input type="number" value="1" /></td>' + 
    '<td class = "subtotal"></td>' + 
    '<td><button class="btn btn-light btn-sm remove">remove</button></td>')

    updatePrices();
  });

});