public with sharing class ContactManager {
    public ContactManager() {

    }
    public static Contact findContactByLastNameAndPhoneAndEmail(String phone, String email, String lastName){
        System.debug('2222');
        List<Contact> contacts = [SELECT Id, Phone, Email, LastName 
                            FROM Contact
                            WHERE Phone =: phone
                            AND Email =: email
                            AND LastName =: lastName];
        if(contacts.size() > 0){
            return contacts[0];
        }else{
            return NULL;
        }
    }
}
