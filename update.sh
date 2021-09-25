curl "https://openexchangerates.org/api/latest.json?&callback=setRates&app_id=$1" > rates.js
cat index.html | sed "s/\.js?v=[^\"]*/.js?v=`date +"%Y%m%d%H%M%S"`/g" > index.html