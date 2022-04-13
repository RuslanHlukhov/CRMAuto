public with sharing class ClientConroller {
    public ClientConroller() {

    }
    @AuraEnabled
    public static Boolean createClient(String firstname, String lastName, String phone, String email, String subject, String text, String carCenterId){
        return  ClientService.createClient(firstname, lastName, phone, email, subject, text, carCenterId);
    }
}
