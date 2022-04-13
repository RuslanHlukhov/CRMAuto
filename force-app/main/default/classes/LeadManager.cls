public with sharing class LeadManager {
    public LeadManager() {

    }
    public static Lead createLead(String firstname, String lastName, String phone, String email){
        Lead lead = new Lead(
            FirstName = firstname,
            LastName = lastName,
            Phone = phone,
            Email = email,
            Company = phone
        ); 
        insert lead;
        return lead;
    }
    public static Lead findLeadByLastNameAndPhoneAndEmail(String phone, String email, String lastName){
        System.debug('2222');
        List<Lead> leads = [SELECT Id, Phone, Email, LastName 
                            FROM Lead
                            WHERE Phone =: phone
                            AND Email =: email
                            AND LastName =: lastName];
        if(leads.size() > 0){
            return leads[0];
        }
        return NULL;
    }
}
