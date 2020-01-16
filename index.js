'use strict';

const searchURL = 'https://api.github.com/users/';

function parseResponse(returnedInfo) {
    console.log(returnedInfo);
    $('ul').removeClass('hidden');

    $('ul').empty();

    for(let i=0; i < returnedInfo.length; i++) {
        $('.contents').append(
            `<li><span class="bold">Repo name:</span> ${returnedInfo[i].name} <span class="bold">URL:</span> ${returnedInfo[i].html_url}</li>`
        )
    }
}

function getRepositories(query) {
  const url = searchURL + query + "/repos";

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => parseResponse(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchHandle = $('#js-search-handle').val();
    getRepositories(searchHandle);
  });
}

$(watchForm);