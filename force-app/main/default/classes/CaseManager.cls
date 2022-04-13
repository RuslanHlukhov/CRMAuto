public with sharing class CaseManager {
    public CaseManager() {

    }
    public static Case createCase(String text, String subject, String carCenterId, String leadId, String email, String contactId){
        System.debug('Create Case');
        Case casee;
        if(leadId != NULL){
        casee = new Case(
            Text__c = text,
            Subject = subject,
            Car_Center__c = carCenterId,
            Lead__c = leadId,
            SuppliedEmail = email
        );
        } else if(contactId != NULL){
            casee = new Case(
            Text__c = text,
            Subject = subject,
            Car_Center__c = carCenterId,
            Contact__c = contactId,
            SuppliedEmail = email
        );
        }
        insert casee;
        return casee;
}
    
}
