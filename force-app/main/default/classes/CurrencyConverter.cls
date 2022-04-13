public with sharing class CurrencyConverter{
    public static final String USD_NAME = 'USD';
    public static final String UAH_NAME = 'UAH';
      
    public CurrencyConverter() {
    }
    
    @future(Callout=true)
    public static void getCurrencies(){
        HTTP h = new HTTP();
        HTTPRequest req = new HTTPRequest();
        req.setEndpoint('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
        req.setMethod('GET');
        HTTPResponse res = h.send(req);
        List<CurrencyWrapper> currencyWrapperList = (List<CurrencyWrapper>)JSON.deserializeStrict(res.getBody(), List<CurrencyWrapper>.class);
        List<Exchange_Rates__c>  newExchangeRates = new List<Exchange_Rates__c>();
        for(CurrencyWrapper currencyWR : currencyWrapperList){
            Exchange_Rates__c exchangeRate = new Exchange_Rates__c(
                Base_Currency__c = currencyWR.ccy,
                Currency__c = currencyWR.base_ccy,
                Value__c = currencyWR.buy.SubString(0,7)
            );    
            newExchangeRates.add(exchangeRate);
        } 
        if(!newExchangeRates.isEmpty()){
            List<Exchange_Rates__c> oldExchangeRates = [SELECT Id FROM Exchange_Rates__c];
            delete oldExchangeRates;
            insert newExchangeRates;
        } else {
            //log ошибки
        }
        
    }

    public class CurrencyWrapper{
        String ccy;
        String base_ccy;
        String buy;
        String sale;

       
        public CurrencyWrapper(){           
        }
    }
}