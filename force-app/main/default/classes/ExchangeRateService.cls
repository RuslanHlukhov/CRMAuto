public with sharing class ExchangeRateService {
    public ExchangeRateService() {
    }

    public static void getUaPrice(){
        return ExchangeRateManager.ExchangeRate();
    }
}
