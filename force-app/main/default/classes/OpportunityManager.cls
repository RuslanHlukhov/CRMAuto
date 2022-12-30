public with sharing class OpportunityManager {
    public OpportunityManager() {

    }
    public static Opportunity createOpportunity(Id leadId, String product, String carCenter,  Decimal priceToConvert){
        // List<Product2> prod = [SELECT Id, PriceUSD__c FROM Product2 WHERE Id =:product];
        Opportunity opp = new Opportunity(
            Lead__c = leadId,
            Name =  carCenter,
            Car_Center__c = product,
            Amount = priceToConvert,
            StageName = 'Prospecting',
            CurrencyIsoCode = 'EUR',
            CloseDate = System.Today()
        );
        insert opp;
        return opp;
    }
}
