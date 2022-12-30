public with sharing class OpportunityService {
    public OpportunityService() {

    }
    public static Decimal formPrice(String dateToForm) {
            if (!String.isBlank(dateToForm)) {
                String priceToConvert = dateToForm.replaceAll('[^.\\d]','');
                return Decimal.valueOf(priceToConvert);
            }else{
                return null;
            }          
    }
    public static Boolean createAccountAndOpportunity(
        String firstname,
        String lastname,
        String phone,
        String email,
        String carCenter,
        String product,
        String price
    ){
        Lead newLead = LeadService.createLead(firstname, lastName, phone, email);
        Decimal priceToConvert = formPrice(price);
        Opportunity opp = OpportunityManager.createOpportunity(newLead.Id, firstname, carCenter, product, priceToConvert);
        return true;
        
    }
}
