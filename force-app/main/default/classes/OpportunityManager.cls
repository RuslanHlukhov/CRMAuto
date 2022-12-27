public with sharing class OpportunityManager {
    public OpportunityManager() {

    }
    public static Opportunity createOpportunity(Id leadId, String carCenter, String product){
        // List<Product2> prod = [SELECT Id, PriceUSD__c FROM Product2 WHERE Id =:product];
        Opportunity opp = new Opportunity(
            Lead__c = leadId,
            Name = carCenter,
            Product__c = product,
            Amount = 55555,
            StageName = 'Prospecting',
            CurrencyIsoCode = 'EUR',
            CloseDate = System.Today()
        );
        insert opp;
        return opp;
    }
}
