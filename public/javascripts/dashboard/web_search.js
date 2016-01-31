function getRandomWeb(){
    $.get("/api/v1/getRandomWeb", {}, function(result){
      if(result.url == '') return;
      $("#web_url").attr('href', result.url);
      $("#introduce").html(result.introduce);
      $("#pic").attr('src', result.pic);
    });
  }
getRandomWeb();
