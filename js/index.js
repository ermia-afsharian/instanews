$(document).ready(function () {
  $('header').css('margin', '100px')
  $('header').css('transform', 'scale(1.2)')

  $('select').on('change', function () {
    
    $('main').empty();

    if ($('select').val() !== 'none') {

      let yourl = `https://api.nytimes.com/svc/topstories/v2/${$('select').val()}.json?api-key=HCZiBZAltzCMkpqAAYGGv88UiSo23GCa`;

      $('main').show();
      $('header').css('margin', '0px')
      $('header').css('transform', 'scale(1)')

      $.ajax({
        method: 'GET',
        url: yourl
      }).always(function () {
        $('.load').css('display', 'block')
      })
        .done(function (data) {
          $('.load').css('display', 'none')

          $.each(data.results.slice(0, 12), function (key, value) {
            $('main').append(`<section class='news' style="background-image:url(${value.multimedia[4] ? value.multimedia[4].url : 'https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg'});"> <a href='${value.url}'><div>${data.results[key].abstract}</div></a></section>`)
          });
        }).fail(function () {
          $('.load').css('display', 'none');
          alert('SORRY! -_("/)_- ');
        });
    } else {
      $('main').hide();
      $('header').css('margin', '100px')
      $('header').css('transform', 'scale(1.2)')

    }


  })
});