var sum = function (acc, x) { return acc + x; };

var updateSubtotal = function(element) {
  var quantity = parseInt($(element).find('.quantity input').val());
  var price = parseFloat($(element).find('.price').text());

  var subtotal = quantity * price;
  $(element).children('.subtotal').html(subtotal);
  return subtotal;
}

var updatePrices = function() {
  var totalPrice = [];
  $('tbody tr').each(function (i, element) {
    var subtotal = updateSubtotal(element);
    totalPrice.push(subtotal);
  });

  var total = totalPrice.reduce(sum);
  $('#totalValue').html(total);
}

$(document).ready(function () {
  updatePrices();

  $('.btn.remove').on('click', function(event) {
    $(this).closest('tr').remove();
    updatePrices();
  });

});