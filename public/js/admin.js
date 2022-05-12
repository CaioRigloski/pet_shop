$('.contact .conclude-btn').on({
  click: function() {
    var contactBox = $(this).closest('.contact-box')
    var email = contactBox.find('.email').text()
    $.ajax({
      type: "POST",
      url: '/admin/painel/excluir_contato',
      dataType: "json",
      data: { email: email}
    }).done(function(data) {
      console.log(data)
    }).fail(function(error) {
      console.log(error)
    }).then((response) => {
      if(response === 'success') {
        contactBox.attr('style', 'background-color: green !important;')
      } else {
        contactBox.attr('style', 'background-color: red !important;')
        $('#error_modal').show()
      }
    })
  }
})

$('#error_modal #error_modal_close').on({
  click: function() {
    $('#error_modal').hide()
  }
})