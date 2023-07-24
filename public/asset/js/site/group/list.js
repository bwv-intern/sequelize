$(function() {
  $(document).ready(function() {
    importCSV();
  });
  function importCSV() {
    $('#importGroup').on('change', function(e) {
      let $input = $(this);

      let files = $input[0].files;

      let fileName = files[0].name;

      let fileSize = files[0].size;

      let extension = fileName.substr(fileName.lastIndexOf('.'));

      let allowedExtensionsRegx = /(\.csv)$/i;

      let size = Math.round(fileSize / 1024);

      let isAllowed = allowedExtensionsRegx.test(extension);
      if (isAllowed) {
        $('#importCsvGroup').submit();
      } else if (!isAllowed) {
        $('#errJs').append(
          '<div class="alert alert-danger alert-dismissible">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageCode.EBT033('CSV') +
            '</div>',
        );
        return false;
      } else if (size > 5 * 1024) {
        $('#errJs').append(
          '<div class="alert alert-danger alert-dismissible">' +
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageCode.EBT034('2 MB') +
            '</div>',
        );
        return false;
      }
    });
  }
});
