public with sharing class OpportunityService {
    public OpportunityService() {

    }

    public static Boolean createAccountAndOpportunity(
        String firstname,
        String lastname,
        String phone,
        String email,
        String carCenter,
        String product
    ){
        Lead newLead = LeadService.createLead(firstname, lastName, phone, email);
        Opportunity opp = OpportunityManager.createOpportunity(newLead.Id, carCenter, product);
        return true;
        
    }
}
