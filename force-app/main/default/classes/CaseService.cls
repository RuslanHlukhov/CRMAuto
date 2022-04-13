public with sharing class CaseService {
    public CaseService() {

    }
    public static Case createCase(String text, String subject, String carCenterId, String leadId, String email, String contactId){
        return CaseManager.createCase(text, subject, carCenterId, leadId, email, contactId);
    }
}
