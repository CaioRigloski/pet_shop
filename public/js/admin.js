// Conlude the contact
$('.contact .conclude-btn').on({
  click: function() {
    var contactBox = $(this).closest('.contact-box')
    var contactId = contactBox.attr('contactId')
    var email = contactBox.find('.email').text()
    $.ajax({
      type: 'POST',
      url: '/admin/painel/excluir_contato',
      dataType: 'json',
      data: { id: contactId, email: email }
    }).done((data) => {
      console.log(data)
    }).fail((error) => {
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
            $(`[contactId = ${contact.id}]`).attr('style', 'background-color: green !important;')
          }
        })
      })
    }
  }
)





