
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyD-GlydV6XRUxzhwysIxq2_VIB9NThsCtI';
resultsNum++;

function watchSubmit() {
  $('.js-search-form').submit(function( event ) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchResults);
  });
}

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
      maxResults: '5',
    },
    dataType: 'json',
    method: 'GET',  //method = type.  method is newer, type is older.
    success: callback //can accept an array of functions, with each function being called in turn
  };
$.ajax(settings)
  .fail(showErr);
}

function displayYoutubeSearchResults(data) {
 const searchResults = data.items.map((item, index) => displayResult(item));
 $('#results').html(`<p>Number of results: ${resultsNum}</p>`)
 $('.js-search-results').html(searchResults);
}

function displayResult(result) {
  resultsNum++;
  return `<div>
	  <h2>
		<a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
		</h2>
	  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank" role="presentation"><img src="${result.snippet.thumbnails.medium.url}" alt="video-thumbnail"></a>
	</div>`;
}

function showErr() {
  return `<p>No YouTube results for that search!</p>`
}

$(watchSubmit);

//define the Endpoint and any API Keys needed
//create a means to retrieve input from the user 
//use AJAX or JSON method to utilize the user input 
//create a means to display AJAX/JSON data retrieved from API