let app = new Vue({
  el: '#app',
  data: {
    isload: false,
    url: {
      cors: 'https://script.google.com/macros/s/AKfycbzqprqdS--MWuhroSbOOmrxsvR-Z21S479LSKlGWW0K29W2GME/exec?url=',
      cors_aqi: 'http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json',
      aqi: 'https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json'
    },
    counties: [],
    aqiData: [],
    publishTime: '',
    focusCounty: '',
    focusSiteIndex: 0
  },
  methods: {
    // 特定區域的
    setSiteIndex (index) {
      this.focusSiteIndex = index
    }
  },
  computed: {
    // 依據 focusCounty 顯示資料
    siteName () {
      this.setSiteIndex(0)
      return this.aqiData.filter(item => item.County === this.focusCounty)
    }
  },
  filters: {
    // 設定aqi值對應的顏色
    aqiColor(name) {
      switch (name) {
        case '良好':
          return 'bg-aqi-good';
        case '普通':
          return 'bg-aqi-moderate';
        case '對敏感族群不健康':
          return 'bg-aqi-unhealthSensitive';
        case '對所有族群不健康':
          return 'bg-aqi-unhealth';
        case '非常不健康':
          return 'bg-aqi-varyUnhealthy';
        case '非常不健康':
          return 'bg-aqi-hazardous';
        default:
          break;
      }
    }
  },
  created () {
    let vm = this
    // open API
    let url = this.url.aqi
    // cors
    // let url = `${this.url.cors}${this.url.cors_aqi}`
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // 1. save all data
        vm.aqiData = data
        // 2. drag county
        vm.counties = [...new Set(data.map(item => item.County))]
        // 3. set focus
        vm.focusCounty = vm.counties.length > 0
          ? vm.counties[0]
          : ''
        // 4. close loading
        vm.isload = true
      })
  }
})