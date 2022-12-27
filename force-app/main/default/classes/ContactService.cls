public with sharing class ContactService {
    public ContactService() {

    }
    public static Contact findContactByLastNameAndPhoneAndEmail(String phone, String email, String lastName){
        return ContactManager.findContactByLastNameAndPhoneAndEmail(phone, email, lastName);
    }
    public static Contact createContact(String lastName, String firstName, String phone, String email){
        return ContactManager.createContact(lastName, firstName, phone, email);
    }
}
