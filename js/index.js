 $( document ).ready(function() {
      $('header').css('margin','100px')
      $('header').css('transform','scale(1.2)')

      $("select").on("change", function(){
        let yourl = "https://api.nytimes.com/svc/topstories/v2/health.json?api-key=HCZiBZAltzCMkpqAAYGGv88UiSo23GCa"

          $('main').empty();
          yourl = yourl.replace("health",$('select').val());
            
          if ($('select').val()!=='none') {
                $('main').show();
                $('header').css('margin','0px')
                $('header').css('transform','scale(1)')
           
        $.ajax({
          method: "GET",
          url: yourl
        }).done(function(data) {
          $.each(data.results, function(key, value) {
             $('main').append(`<section class='news' style="background-image:url(${value.multimedia[4]?value.multimedia[4].url: "https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg" });"> <a href='${value.url}'><div>${data.results[key].abstract}</div></a></section>`)
            });
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