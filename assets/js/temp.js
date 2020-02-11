created() {
  let cors = 'https://script.google.com/macros/s/AKfycbzqprqdS--MWuhroSbOOmrxsvR-Z21S479LSKlGWW0K29W2GME/exec?url='
  let url = 'http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json'
  // https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json
  fetch(`${cors}${url}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    })
    .catch(e => {
      console.log(e)
    })
}