'use strict';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].url}</a></h3>
      <p>Title: ${responseJson[i].name}</p>
      <p>Description: ${responseJson[i].description}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getRepo(user) {
  const params = {
    accept: 'application/vnd.github.v3+json',
    username: user,
    type: 'all'
  };
  const searchURL = `https://api.github.com/users/${user}/repos`
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#user-name').val();
    //console.log(userName);
    getRepo(userName);
  });
}

$(watchForm);
