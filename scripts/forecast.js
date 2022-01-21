class Forecast{
    constructor(){
        this.key = 'bG5aP2lPtLv3VYnBi7Gbhh6Bn99Y13Ol';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){
        const cityInfo = await this.getCity(city);
        const weather = await this.getWeather(cityInfo.Key);

        return { cityInfo, weather }; // same property name and value 
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }

    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
}