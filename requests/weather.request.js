const rp = require('request-promise');

module.exports = async function (city = '') {
    if (!city){
        throw new Error('Имя города не может быть пустым');
    }

    const KEY = '1d746bae48f77b2083b94f7da1da0ad1';
    const uri = 'http://api.openweathermap.org/data/2.5/weather';

     /**
     * Смотри документацию
     * https://www.npmjs.com/package/request-promise
     * https://openweathermap.org/current
     **/
    const options = {
        uri,
        qs:{
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    };
    try {
        const data = await rp(options);
        const celsius = Math.ceil((data.main.temp - 32)*5/9);

        return {
            weather: `${data.name}:${celsius}`,
            error: null
        }
    }
    catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }


};
