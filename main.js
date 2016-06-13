'use strict'

$(document).ready(init);

function init(){
  $('.search').click(searchMovie);
  $('.reset').click(resetType);
  $('.movieListsShow').on('dblclick','.movieListStyle',showMovieInfo);
  $('.navPage').on('click','.next',nextPage);
  $('.navPage').on('click','.previous',previousPage);
}
var page = 1;
function nextPage(){
  // page;
  searchMovie(++page);
}

function previousPage(){
  page--;
  searchMovie(page);
}

function resetType(){
  console.log("resetType");
  $('.errorType').text('').hide();
  $('.title').val('');
  $('.year').val('');
  $('.movieListsShow').empty();
}

function searchMovie(){
  var title = $('.title').val();
  var year = $('.year').val();
  var plot = $('#plot').val();
  $('.errorType').hide().text("");
  console.log("page: ",page);
  var url = `http://www.omdbapi.com/?s=${title}&y=${year}&plot=${plot}&page=${page}`;

  $.ajax(url)
  .done(function(data){
    // console.log(data);
    if(data.Response === "False"){

      $('.errorType').show().text(data.Error);

    }else{

      var totalResult = data.totalResults;
      var text = `found ${totalResult} resource(s)`;
      $('.totalResult').addClass('alert alert-success').show().text(text);
      $('.notify').addClass('alert alert-info').show().text("double click to get movie infomation");

      if(page==1){
        $('.previous').prop("diabled",false);
      }
      if(totalResult>10){
        $('.navPage').show();
      }


      let $divs = createMovieLists(data.Search);
      // console.log($divs);
      $('.movieListsShow').empty().append($divs);
    }
  })
  .fail(function(){
    console.log("Error!");
  });

}

function createMovieLists(allMovie){
  return allMovie.map(movie =>{
    let $div = $('.movieLists').clone();
    $div.removeClass('movieLists');
    $div.find('.movieTitle').text(movie.Title);
    $div.find('.title').text(movie.Title);
    $div.data('imdbID',movie.imdbID);
    $div.find('.year').text(movie.Year);
    $div.find('.imdbID').text(movie.imdbID);
    $div.find('.type').text(movie.Type);
    $div.find('.poster').attr('src',movie.Poster);
    return $div;

  });
}

function showMovieInfo(){
  console.log("showMovieDetail");
  // debugger;
  var imdbID = $(this).data('imdbID');
  console.log(imdbID);


  var index = $(this).index();
  // debugger;
  $.ajax(`http://www.omdbapi.com/?i=${imdbID}`)
  .done(function(data){

    console.log("data: ",data);

    if(data.Response === "False"){
      console.log("data.Response is False")
    }else{
      // console.log(data);
      var $divInfo = $('.titleInfo').clone();
      $divInfo.removeClass('titleInfo');
      $divInfo.find('.infoTitle').text(data.Title);
      $divInfo.find('.infoYear').text(data.Year);
      $divInfo.find('.infoRated').text(data.Rated);
      $divInfo.find('.infoReleased').text(data.Released);
      $divInfo.find('.infoRuntime').text(data.Runtime);
      $divInfo.find('.infoGenre').text(data.Genre);
      $divInfo.find('.infoDirector').text(data.Director);
      $divInfo.find('.infoWriter').text(data.Writer);
      $divInfo.find('.infoActors').text(data.Actors);
      $divInfo.find('.infoPlot').text(data.Plot);
      $divInfo.find('.infoLanguage').text(data.Language);
      $divInfo.find('.infoCountry').text(data.Country);
      $divInfo.find('.infoAwards').text(data.Awards);
      $divInfo.find('.infoMetascore').text(data.Metascore);
      $divInfo.find('.infoimdbRating').text(data.imdbRating);
      $divInfo.find('.infoimdbVoted').text(data.imdbVoted);

      // debugger;
      $($('.movieListStyle')[index]).append($divInfo);
      console.log("movie[index]: ",$('.movieListStyle')[index]);

    }



  })
  .fail(function(){
    console.log("Error!");
  });


}
