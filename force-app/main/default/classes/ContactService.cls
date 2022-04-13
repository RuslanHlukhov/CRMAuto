public with sharing class ContactService {
    public ContactService() {

    }
    public static Contact findContactByLastNameAndPhoneAndEmail(String phone, String email, String lastName){
        return ContactManager.findContactByLastNameAndPhoneAndEmail(phone, email, lastName);
    }
}
