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
       String product,
       String price
       ){
        return OpportunityService.createAccountAndOpportunity(
            firstname,
            lastname,
            phone,
            email,
            carCenter,
            product,
            price
        );
    }
}
