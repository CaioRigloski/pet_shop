// Conclude the contact
$('.contact .conclude-btn').on({
  click: function() {
    var contactBox = $(this).closest('.contact-box')
    var contactId = contactBox.attr('contactId')
    var email = contactBox.find('.email').text()
    $.ajax({
      type: 'POST',
      url: '/admin/painel/concluir_contato',
      dataType: 'json',
      data: { id: contactId, email: email }
    }).done((data) => {
      console.log(data)
    }).fail((error) => {
      console.log(error)
    }).then((response) => {
      if(response === 'success') {
        contactBox.attr('style', 'background-color: green !important; color: white;')
        contactBox.find('.undo-btn').show()
        $(this).hide()
      } else {
        contactBox.attr('style', 'background-color: red !important;')
        $('#error_modal').show()
      }
    })
  }
})

// Undo contact conclusion
$('.contact .undo-btn').on({
  click: function() {
    var contactBox = $(this).closest('.contact-box')
    var contactId = contactBox.attr('contactId')
    var email = contactBox.find('.email').text()
    $.ajax({
      type: 'POST',
      url: '/admin/painel/desfazer_contato',
      dataType: 'json',
      data: { id: contactId, email: email }
    }).done((data) => {
      console.log(data)
    }).fail((error) => {
      console.log(error)
    }).then((response) => {
      if(response === 'success') {
        contactBox.attr('style', 'background-color: #f8f9fa !important;')
        contactBox.find('.conclude-btn').show()
        $(this).hide()
      } else {
        contactBox.attr('style', 'background-color: red !important;')
        $('#error_modal').show()
      }
    })
  }
})


// Close error modal
$('#error_modal #error_modal_close').on({
  click: function() {
    $('#error_modal').hide()
  }
})

// Page on load
$(
  () => {
    var path = window.location.pathname
    if(path.match('/admin/painel/')) {
      $.ajax({
        type: "GET",
        url: '/admin/painel/api/contacts',
      }).done(() => {
        
      }).fail((error) => {
        console.log(error)
      }).then((response) => {
        response.forEach((contact, i) => {
          if(contact.is_concluded === 1) {
            var contactBox = $(`[contactId = ${contact.id}]`)
            contactBox.attr('style', 'background-color: green !important; color: white;')
            contactBox.find('.conclude-btn').hide()
            contactBox.find('.undo-btn').show()
          }
        })
      })
    }
  }
)





