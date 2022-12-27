public with sharing class OpportunityController {
    public OpportunityController() {

    }
    @AuraEnabled
    public static Boolean createAccountAndOpportunity(
       String firstname,
       String lastname,
       String phone,
       String email,
       String carCenter,
       String product
       ){
        return OpportunityService.createAccountAndOpportunity(
            firstname,
            lastname,
            phone,
            email,
            carCenter,
            product
        );
    }
}
