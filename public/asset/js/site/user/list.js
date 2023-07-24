$(function() {
  $(document).ready(function() {
    logout();
    if (localStorage.getItem('log') == 1) {
      window.location.reload();
    }
    buttonHref();
    activeMenu();
    backReload();
    $('#loading').hide();
    startedDatePicker();
    formValidation();
    clearSearch();
    exportCSV();
  });

  function buttonHref() {
    $(document).on('click', '.tda, #newUser', function(e) {
      e.preventDefault();
      localStorage.clear();
      localStorage.setItem('url', new URL(location));
      let url = '';
      if ($(this).attr('class') == 'tda') {
        const id = $(this).attr('name');
        url = '/user/form/' + id;
      } else {
        url = '/user/form/';
      }
      window.location.replace(url);
    });
  }

  function logout() {
    $('#logout').on('click', function() {
      localStorage.clear();
      localStorage.setItem('log', 1);
    });
  }

  /**
   * Active menu
   */
  function activeMenu() {
    const pathname = window.location.pathname;
    const urlbase = pathname.split('/');
    $('.left-menu-item > a[href="' + '/' + urlbase[1] + '"]').addClass(
      'active',
    );
    if ($('.boxtwo').height() > 450) {
      $('.body').css('height', '100%');
    }
  }

  /**
   * Clear input search
   */
  function clearSearch() {
    $('#clearSearch').on('click', function(e) {
      e.preventDefault();
      $('input[name="name"]').val('');
      $('input[name="startedDateFrom"]').val('');
      $('input[name="startedDateTo"]').val('');
      $('#startedFrom-error').text('');
      $('#startedTo-error').text('');
      $('#startedFrom-error').css('display', 'none');
      $('#startedTo-error').css('display', 'none');
    });
  }

  /**
   * Form validation
   */
  function formValidation() {
    // Form Validation
    $.validator.addMethod(
      'validateDateFromAndTo',
      function(value, element, params) {
        const startDate = moment($(params).val(), 'DD/MM/YYYY').format(
          'YYYY/MM/DD',
        );
        const endDate = moment(value, 'DD/MM/YYYY').format('YYYY/MM/DD');
        const date = moment(value, 'DD/MM/YYYY', true);
        if (value == '') {
          return true;
        } else {
          if (date.isValid()) {
            if ($(params).val() == '') {
              return true;
            } else {
              if (
                moment($('#startedFrom').val(), 'DD/MM/YYYY', true).isValid()
              ) {
                if (endDate >= startDate) {
                  $('#startedFrom-error').text('');
                  return true;
                } else {
                  $('#startedFrom-error').text('');
                  return false;
                }
              } else {
                return true;
              }
            }
          } else {
            if ($('#startedFrom-error').text() == messageCode.EBT044) {
              $('#startedFrom-error').text('');
            }
            return false;
          }
        }
      },
      function(params, element) {
        const startDate = moment($('#startedFrom').val(), 'DD/MM/YYYY').format(
          'YYYY/MM/DD',
        );
        const endDate = moment($(element).val(), 'DD/MM/YYYY').format(
          'YYYY/MM/DD',
        );
        const date = moment($(element).val(), 'DD/MM/YYYY', true);
        if (date.isValid()) {
          if (moment($('#startedFrom').val(), 'DD/MM/YYYY', true).isValid()) {
            if (endDate < startDate) {
              return messageCode.EBT044;
            }
          }
        } else {
          return messageCode.EBT008('Started Date To');
        }
      },
    );
    $.validator.addMethod(
      'validateDateToAndFrom',
      function(value, element, params) {
        const startDate = moment(value, 'DD/MM/YYYY').format('YYYY/MM/DD');
        const endDate = moment($(params).val(), 'DD/MM/YYYY').format(
          'YYYY/MM/DD',
        );
        const date = moment(value, 'DD/MM/YYYY', true);
        if (value == '') {
          return true;
        } else {
          if (date.isValid()) {
            if ($(params).val() == '') {
              return true;
            } else {
              if (moment($('#startedTo').val(), 'DD/MM/YYYY', true).isValid()) {
                if (endDate >= startDate) {
                  $('#startedTo-error').text('');
                  return true;
                } else {
                  $('#startedTo-error').text('');
                  return false;
                }
              } else {
                return true;
              }
            }
          } else {
            if ($('#startedTo-error').text() == messageCode.EBT044) {
              $('#startedTo-error').text('');
            }
            return false;
          }
        }
      },
      function(params, element) {
        const startDate = moment($(element).val(), 'DD/MM/YYYY').format(
          'YYYY/MM/DD',
        );
        const endDate = moment($('#startedTo').val(), 'DD/MM/YYYY').format(
          'YYYY/MM/DD',
        );
        const date = moment($(element).val(), 'DD/MM/YYYY', true);
        if (date.isValid()) {
          if (moment($('#startedTo').val(), 'DD/MM/YYYY', true).isValid()) {
            if (endDate < startDate) {
              return messageCode.EBT044;
            }
          } else {
            return '';
          }
        } else {
          return messageCode.EBT008('Started Date From');
        }
      },
    );
    // Validation search user
    $('#searchUserFrom').validate({
      onkeyup: false,
      onfocusout: function(element) {
        if (
          $('#startedTo-error').text() ==
            messageCode.EBT008('Started Date To') ||
          $('#startedTo-error').text() == messageCode.EBT044
        ) {
          $('#errorTo').text('');
          $('#errorFrom').text('');
        }
        if (
          $(element).attr('data-error') == '#errorDateFrom' &&
          $('#errorFrom').text() == messageCode.EBT044 &&
          $('#startedFrom-error').text() !=
            messageCode.EBT008('Started Date From')
        ) {
          $('#startedFrom-error').text('');
          $('#startedTo').datepicker('hide');
          $('#startedTo').focus();
          $('#startedTo').blur();
          $('#errorFrom').text('');
          setTimeout(() => {
            $('#startedTo').focus();
          }, 100);
        } else if (
          $(element).attr('data-error') == '#errorDateFrom' &&
          $('#errorTo').text() == messageCode.EBT044 &&
          $('#startedFrom-error').text() !=
            messageCode.EBT008('Started Date From')
        ) {
          $('#startedFrom-error').text('');
          $('#errorFrom').text(messageCode.EBT044);
          $('#errorFrom').css('display', 'none');
          $('#errorTo').text('');
        } else {
          this.element(element);
          if ($('#startedFrom-error').text() == messageCode.EBT044) {
            $('#startedFrom-error').text('');
            $('#errorTo').text(messageCode.EBT044);
            $('#errorTo').css('display', 'none');
            $('#startedTo').datepicker('hide');
            $('#startedTo').focus();
            $('#startedTo').blur();
            setTimeout(() => {
              $('#startedTo').focus();
            }, 100);
          }
          if (
            $('#startedFrom-error').text() ==
            messageCode.EBT008('Started Date From')
          ) {
            $('#errorTo').text('');
            $('#errorFrom').text('');
          }
        }
      },
      lang: 'ja',
      errorElement: 'span',
      errorClass: 'has-error col-10',
      highlight: function(element, errorClass) {
        // $(element).parents('.inputBox').addClass(errorClass);
      },
      unhighlight: function(element, errorClass) {
        // $(element).parents('.inputBox').removeClass(errorClass);
      },
      errorPlacement: function(err, el) {
        err.addClass('help-block').appendTo(el.parent());
        let placement = $(el).data('error');
        if (placement) {
          $(placement).append(err);
        } else {
          err.insertAfter(el);
        }
      },
      rules: {
        startedDateTo: {
          validateDateFromAndTo: '#startedFrom',
        },
        startedDateFrom: {
          validateDateToAndFrom: '#startedTo',
        },
      },
      messages: {},
      submitHandler: function(form) {
        $(window).off('beforeunload');
        $('#loading').show();
        $('#searchUser').attr('disabled', true);
        localStorage.clear();
        form.submit();
      },
    });
    $('#searchUser').on('click', function(e) {
      e.preventDefault();
      if ($('#searchUserFrom').valid()) {
        $('#searchUserFrom').submit();
      } else {
        if (
          $('#startedFrom-error').text() == messageCode.EBT044 ||
          $('#startedTo-error').text() == messageCode.EBT044
        ) {
          $('#startedFrom-error').text('');
          $('#startedTo-error').text(messageCode.EBT044);
          $('#startedTo').focus();
        }
      }
    });
  }

  /**
   * Back detech browser
   */
  function backReload() {
    window.addEventListener('pageshow', e => {
      if (e.persisted) {
        window.location.reload();
      }
    });
  }
  /**
   * Back detech browser
   */
  function backDetect() {
    $(window).on('beforeunload', function(e) {
      return 'On before unload';
    });
  }

  /**
   *Format started date from and started date to
   */
  function startedDatePicker() {
    $('#startedFrom').datepicker({
      format: 'dd/mm/yyyy',
      forceParse: false,
    });
    $('#startedTo').datepicker({
      format: 'dd/mm/yyyy',
      forceParse: false,
    });
    $('.date-icon-from').on('click', function() {
      $('#startedFrom').focus();
    });
    $('.date-icon-to').on('click', function() {
      $('#startedTo').focus();
    });
    $('#startedFrom')
      .datepicker()
      .on('show', function() {
        $('#searchUserFrom').validate().settings.onfocusout = false;
      });
    $('#startedFrom')
      .datepicker()
      .on('hide', function() {
        $('#searchUserFrom').validate().settings.onfocusout = function(
          element,
        ) {
          if (
            $('#startedTo-error').text() ==
              messageCode.EBT008('Started Date To') ||
            $('#startedTo-error').text() == messageCode.EBT044
          ) {
            $('#errorTo').text('');
            $('#errorFrom').text('');
          }
          if (
            $(element).attr('data-error') == '#errorDateFrom' &&
            $('#errorFrom').text() == messageCode.EBT044 &&
            $('#startedFrom-error').text() !=
              messageCode.EBT008('Started Date From')
          ) {
            $('#startedFrom-error').text('');
            $('#startedTo').datepicker('hide');
            $('#startedTo').focus();
            $('#startedTo').blur();
            $('#errorFrom').text('');
            setTimeout(() => {
              $('#startedTo').focus();
            }, 100);
          } else if (
            $(element).attr('data-error') == '#errorDateFrom' &&
            $('#errorTo').text() == messageCode.EBT044 &&
            $('#startedFrom-error').text() !=
              messageCode.EBT008('Started Date From')
          ) {
            $('#startedFrom-error').text('');
            $('#errorFrom').text(messageCode.EBT044);
            $('#errorFrom').css('display', 'none');
            $('#errorTo').text('');
          } else {
            this.element(element);
            if ($('#startedFrom-error').text() == messageCode.EBT044) {
              $('#startedFrom-error').text('');
              $('#errorTo').text(messageCode.EBT044);
              $('#errorTo').css('display', 'none');
              $('#startedTo').datepicker('hide');
              $('#startedTo').focus();
              $('#startedTo').blur();
              setTimeout(() => {
                $('#startedTo').focus();
              }, 100);
            }
            if (
              $('#startedFrom-error').text() ==
              messageCode.EBT008('Started Date From')
            ) {
              $('#errorTo').text('');
              $('#errorFrom').text('');
            }
          }
        };
      });
  }

  /**
   * Export csv
   */
  function exportCSV() {
    $('#exportCSV').on('click', function(e) {
      e.preventDefault();
      $('#searchUserFrom')
        .attr('action', '/user/exportCSV')
        .submit();
      $('#searchUserFrom').attr('action', '/user');
      $('#loading').hide();
      $('#searchUser').attr('disabled', false);
    });
  }
});
