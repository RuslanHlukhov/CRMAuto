public with sharing class ClientService {
    public ClientService() {

    }
    public static Boolean createClient(String firstname, String lastName, String phone, String email, String subject, String text, String carCenterId){
        //1. Проверить есть ли такой контакт и если есть создать кейс и присвоить его как владельца кейса
        //2. Проверить есть ли такой лид и если есть лид создать кейс и присвоить его как владельца кейса
        //3. В случаи результата false в двух первых пунктах создать лида и если есть лид создать кейс и присвоить его как владельца кейса
        //Contact contact = ContactService.findContactByLastNameAndPhoneAndEmail(lastName, phone, email);
        //if(contact != NULL){
            //1. Создать Кейс. В метод в классе CaseService передавать : text, subject, carCenterId, contact.Id использовать для создания Case. 
            //2. Возвратить true либо false в зависимости от результата;
           // return true;
       // }
       Lead lead = LeadService.findLeadByLastNameAndPhoneAndEmail(phone, email, lastName);
       Contact contact = ContactService.findContactByLastNameAndPhoneAndEmail(phone, email, lastName);
       //Проверка на наличее такого лида и контакта (если условие выполняется удаляем лида и создаем кейс для контакта)
       if(lead != NULL && contact != NULL){ 
           delete lead;
           Case casee = CaseService.createCase(text, subject, carCenterId, NULL, email, contact.Id);
           return true;    
       }
       //Если контакт есть, а лида нет, то создаем кейс для контакта.
       if(lead == NULL && contact != NULL){
            Case casee = CaseService.createCase(text, subject, carCenterId, lead.Id, email, NULL);
            return true;
       }
       //Если лид есть, то сохдаем кейс для него
       if(lead != NULL){
            Case casee = CaseService.createCase(text, subject, carCenterId, lead.Id, email, NULL);
            return true;
       }   
       Lead newLead = LeadService.createLead(firstname, lastName, phone, email);
       CaseService.createCase(text, subject, carCenterId, newLead.Id, email, NULL);
       return true;
       

        }
        // public static Boolean byeCar(String firstname,
        // String lastname,
        // String phone,
        // String email,
        // String carCenter,
        // String product){
        //     Contact contact = new Contact(firstname, lastname, phone, email);
        //     Opportunity opp = new Opportunity(contactId, carCenter, product);
        //У Case есть 2 поля contactId и Lead__с

        
            //1. Создать Кейс. В метод в классе CaseService передавать : text, subject, carCenterId, lead.Id; использовать для создания Case. 
            //2. Возвратить true либо false в зависимости от результата;
           // return true;
        //}
    }
}
