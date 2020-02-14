 $( document ).ready(function() {
      $('header').css('margin','100px')
      $('header').css('transform','scale(1.2)')

      $('select').on('change', function(){
        let url = 'https://api.nytimes.com/svc/topstories/v2/health.json?api-key=HCZiBZAltzCMkpqAAYGGv88UiSo23GCa'

          $('main').empty();
          url = url.replace('health',$('select').val());
            
          if ($('select').val()!=='none') {
                $('main').show();
                $('header').css('margin','0px')
                $('header').css('transform','scale(1)')
           
        $.ajax({
          method: 'GET',
          url: url
        }).always(function(){
          $('.load').css('display','block')
        })
        .done(function(data) {
          $('.load').css('display','none')

          for (let i = 0; i < 12; i++) {

             $('main').append(`<section class='news' style="background-image:url(${data.results[i].multimedia[4]?data.results[i].multimedia[4].url: "https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg" });"> <a href='${data.results[i].url}'><div>${data.results[i].abstract}</div></a></section>`)
            
          }
        }).fail(function(data){
            alert('SORRY! -_("/)_- ');
          });
        }else{
          $('main').hide();
          $('header').css('margin','100px')
          $('header').css('transform','scale(1.2)')

          }   

          
    })
});