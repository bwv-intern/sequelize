$(function() {
  $(document).ready(function() {
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
    }
    deleteUser();
    cancelUser();
    startedDatePicker();
    formValidation();
    $('#formUserUpdate').on('change', function() {
      backDetect();
    });
    $('#formUserCreate').on('change', function() {
      backDetect();
    });
  });

  function deleteUser() {
    $('#deletedUser').on('click', function(e) {
      e.preventDefault();
      const id = $(this).attr('name');
      $('.ui-dialog').wrap(
        '<div class="dialog-deleteuser" style="width: 100%; height: 100vh; position: absolute; top: 0; z-index: 1000000;"></div>',
      );
      $('.text').text('このユーザーを削除してもいいですか？');
      $('.ui-dialog-titlebar-close')
        .attr('style', 'border: none; background-color: #e9e9e9')
        .text('X');
      $('.ui-dialog-titlebar-close').on('click', function() {
        $('.dialog-deleteuser').css('height', '0');
        $('.dialog-deleteuser').css('width', '0');
      });
      $('#dialog-confirm').dialog({
        autoOpen: true,
        height: 'auto',
        width: 400,
        modal: true,
        buttons: {
          Ok: {
            text: 'Ok',
            class: 'btn btn-primary',
            click: function() {
              $('#formUserUpdate').validate().cancelSubmit = true;
              $('#formUserUpdate')
                .attr('action', '/user/' + id + '/delete')
                .submit();
              $('.dialog-deleteuser').css('height', '0');
              $('.dialog-deleteuser').css('width', '0');
              $(this).dialog('close');
            },
          },
          Cancel: {
            text: 'Cancel',
            class: 'btn btn-danger',
            click: function() {
              $('.dialog-deleteuser').css('height', '0');
              $('.dialog-deleteuser').css('width', '0');
              $(this).dialog('close');
            },
          },
        },
      });
    });
    $('#dialog-confirm').dialog({
      autoOpen: false,
    });
  }
  /**
   * Validation User
   */
  function formValidation() {
    // Form Validation
    $.validator.addMethod(
      'validatePassword',
      function(value, element) {
        if (value.length > 0) {
          if (/^[0-9]+$/g.test(value) || /^[a-zA-Z]+$/g.test(value)) {
            return false;
          } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/g.test(value)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      function(params, element) {
        if (
          /^[0-9]+$/g.test($(element).val()) ||
          /^[a-zA-Z]+$/g.test($(element).val())
        ) {
          return messageCode.EBT025;
        } else {
          return messageCode.EBT023;
        }
      },
    );
    $.validator.addMethod(
      'validateAll',
      function(value, element) {
        return (
          this.optional(element) ||
          /^[a-zA-Z0-9ｧ-ﾝﾞﾟ -~]+(([a-zA-Z0-9ｧ-ﾝﾞﾟ -~])?[a-zA-Z0-9ｧ-ﾝﾞﾟ -~]*)*$/g.test(
            value,
          )
        );
      },
      function(params, element) {
        return messageCode.EBT004(
          $(`label[for=${$(element).attr('name')}]`).text(),
        );
      },
    );
    $.validator.addMethod(
      'validateEmail',
      function(value, element) {
        return (
          this.optional(element) ||
          /^[\w-\.+*&^%$/()#!_=`~;:'"?<>|\[{}\]]+@([\w-\.+*&^%$/()#!_=`~;:'"?<>|\[{}\]]+\.)+[\w-]{2,5}$/g.test(
            value,
          )
        );
      },
      messageCode.EBT005,
    );
    $.validator.addMethod(
      'validateStartedDate',
      function(value, element) {
        const date = moment(value, 'DD/MM/YYYY', true);
        if (date.isValid()) {
          return true;
        } else {
          return false;
        }
      },
      messageCode.EBT008('Started Date'),
    );
    $.validator.addMethod(
      'validateMaxName',
      function(value, element) {
        if (value.length > 100) {
          return false;
        } else {
          return true;
        }
      },
      function(params, element) {
        return messageCode.EBT002('User Name', '100', $(element).val().length);
      },
    );
    $.validator.addMethod(
      'validateMaxEmail',
      function(value, element) {
        if (value.length > 255) {
          return false;
        } else {
          return true;
        }
      },
      function(params, element) {
        return messageCode.EBT002('Email', '255', $(element).val().length);
      },
    );

    // Validation register user
    $('#formUserCreate').validate({
      onkeyup: false,
      onfocusout: function(element) {
        this.element(element);
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
        $('#errorMessage').html('');
        $('.searchdiv > .row').css('align-items', 'normal');
        $('.searchdiv').css('align-items', 'normal');
      },
      rules: {
        name: {
          required: true,
          validateAll: true,
          validateMaxName: true,
        },
        email: {
          required: true,
          validateAll: true,
          validateEmail: true,
          validateMaxEmail: true,
        },
        groupId: {
          required: true,
        },
        startedDate: {
          required: true,
          validateAll: true,
          validateStartedDate: true,
        },
        positionId: {
          required: true,
        },
        password: {
          required: true,
          validateAll: true,
          validatePassword: true,
        },
        rePassword: {
          required: true,
          equalTo: '#password',
        },
      },
      messages: {
        name: {
          required: messageCode.EBT001('User Name'),
        },
        email: {
          required: messageCode.EBT001('Email'),
        },
        groupId: {
          required: messageCode.EBT001('Group'),
        },
        startedDate: {
          required: messageCode.EBT001('Started Date'),
        },
        positionId: {
          required: messageCode.EBT001('Position'),
        },
        password: {
          required: messageCode.EBT001('Password'),
        },
        rePassword: {
          required: messageCode.EBT001('Password Confirmation'),
          equalTo: messageCode.EBT030,
        },
      },
      submitHandler: function(form) {
        $(window).off('beforeunload');
        $('#loading').show();
        $('#createdUser').attr('disabled', true);
        form.submit();
      },
    });
    // Validation update user
    $.validator.addMethod(
      'validateRePwd',
      function(value, element, params) {
        if ($(params).val().length >= 1) {
          if(value.length >= 1) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      function(params, element) {
        return messageCode.EBT001('Password Confirmation');
      },
    );
    $('#formUserUpdate').validate({
      onkeyup: false,
      onfocusout: function(element) {
        this.element(element);
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
        $('#errorMessage').html('');
        $('.searchdiv > .row').css('align-items', 'normal');
        $('.searchdiv').css('align-items', 'normal');
      },
      rules: {
        name: {
          required: true,
          validateAll: true,
          validateMaxName: true,
        },
        email: {
          required: true,
          validateAll: true,
          validateEmail: true,
          validateMaxEmail: true,
        },
        groupId: {
          required: true,
        },
        startedDate: {
          required: true,
          validateAll: true,
          validateStartedDate: true,
        },
        positionId: {
          required: true,
        },
        password: {
          validateAll: true,
          validatePassword: true,
        },
        rePassword: {
          validateRePwd: '#password',
          equalTo: '#password',
        },
      },
      messages: {
        name: {
          required: messageCode.EBT001('User Name'),
        },
        email: {
          required: messageCode.EBT001('Email'),
        },
        groupId: {
          required: messageCode.EBT001('Group'),
        },
        startedDate: {
          required: messageCode.EBT001('Started Date'),
        },
        positionId: {
          required: messageCode.EBT001('Position'),
        },
        rePassword: {
          equalTo: messageCode.EBT030,
        },
      },
      submitHandler: function(form) {
        $(window).off('beforeunload');
        $('#loading').show();
        $('#updatedUser').attr('disabled', true);
        form.submit();
      },
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
   * Format started date
   */
  function startedDatePicker() {
    $('#startedDate').datepicker({format: 'dd/mm/yyyy', forceParse: false});
    $('.date-icon').on('click', function() {
      $('#startedDate').focus();
    });
    $('#startedDate')
      .datepicker()
      .on('show', function() {
        console.log('show');
        if ($('#formUserCreate').length == 1) {
          $('#formUserCreate').validate().settings.onfocusout = false;
        }
        if ($('#formUserUpdate').length == 1) {
          $('#formUserUpdate').validate().settings.onfocusout = false;
        }
      });
    $('#startedDate')
      .datepicker()
      .on('hide', function() {
        console.log('hide');
        if ($('#formUserCreate').length == 1) {
          $('#formUserCreate').validate().settings.onfocusout = function(
            element,
          ) {
            this.element(element);
          };
        }
        if ($('#formUserUpdate').length == 1) {
          $('#formUserUpdate').validate().settings.onfocusout = function(
            element,
          ) {
            this.element(element);
          };
        }
      });
  }

  /**
   * Cancel register or update or delete user
   */
  function cancelUser() {
    $('#cancelUser').on('click', function(e) {
      e.preventDefault();
      const url = localStorage.getItem('url');
      const currentUrl = new URL(location);
      if (document.referrer == currentUrl && url) {
        window.location.replace(url);
      } else if (document.referrer != url) {
        window.location.replace('/user');
      } else if (url) {
        window.location.replace(url);
      } else {
        window.location.replace('/user');
      }

      localStorage.clear();
    });
  }
});
