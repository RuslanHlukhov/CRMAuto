public with sharing class LeadService {
    public LeadService() {

    }
    public static Lead createLead(String firstname, String lastName, String phone, String email){
        return LeadManager.createLead(firstname, lastName, phone, email);
    }
    public static Lead findLeadByLastNameAndPhoneAndEmail(String phone, String email, String lastName){
        return LeadManager.findLeadByLastNameAndPhoneAndEmail(phone, email, lastName);
    }
}
 