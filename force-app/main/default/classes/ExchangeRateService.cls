public with sharing class ExchangeRateService {
    public ExchangeRateService() {
    }

    public static String getUaPriceFromUsd(String usdPriceForProduct){
        List<Exchange_Rates__c> exchangeList = ExchangeRateManager.ExchangeRate();
        if(exchangeList.isEmpty()){
            return 'Error';
        } else{
            Double usdPriceForUa = Double.valueOf(exchangeList[0].Value__c);
            Double productPrice = Double.valueOf(usdPriceForProduct);
            Double uaPriceForProduct = usdPriceForUa*productPrice;
            String priceToReturn = String.valueOf(uaPriceForProduct).replace('.','').subString(0,7);
            return priceToReturn;
        }
    }
}
