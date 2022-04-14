public with sharing class ExchangeRateManager {

    public static List<Exchange_Rates__c> ExchangeRate(){
        return [SELECT Id, Value__c FROM Exchange_Rates__c
        WHERE Base_Currency__c = 'USD'];
    }

    public ExchangeRateManager() {
    }
}
