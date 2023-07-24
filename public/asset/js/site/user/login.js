$(function() {
  $(document).ready(function() {
    if($('.logOut').length != 1) {
      localStorage.setItem('log',1);
    }
    backReload();
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
    }
    $('#loading').hide();
    formValidation();
    $('#loginFrm').on('change', function() {
      backDetect();
    });
  });
  /**
   * Form validation
   */
  function formValidation() {
    // Form Validation
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

    //Validaiton login
    $('#loginFrm').validate({
      onkeyup: false,
      onfocusout: function(element) {
        this.element(element);
      },
      lang: 'ja',
      errorElement: 'span',
      errorClass: 'has-error',
      highlight: function(element, errorClass) {
        // $(element).parents('.inputBox').addClass(errorClass);
      },
      unhighlight: function(element, errorClass) {
        // $(element).parents('.inputBox').removeClass(errorClass);
      },
      errorPlacement: function(err, el) {
        err.addClass('help-block').appendTo(el.parent());
        $('#errorMessage').html('');
      },
      rules: {
        email: {
          required: true,
          validateEmail: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        email: {
          required: messageCode.EBT001('Email'),
        },
        password: {
          required: messageCode.EBT001('Password'),
        },
      },
      submitHandler: function(form) {
        $(window).off('beforeunload');
        $('#loading').show();
        $('#loginButton').attr('disabled', true);
        localStorage.clear();
        form.submit();
      },
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
});
