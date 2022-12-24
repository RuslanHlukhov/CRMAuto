public with sharing class carListManager {
    public static List<Product2> getCars(){
        System.debug('getCars carListManager');
        return [SELECT Id, Name, Build_Data__c, Engine_capacity__c, Model__c, PriceUSD__c, Vin_Code__c,
        (SELECT Id, Name FROM Attachments)
        FROM Product2
        WHERE Satus__c = 'In stock'           
    ];
}
    public static List<Product2> getCarsByEngineCapacity(){
        return [SELECT Id, Name, Build_Data__c, Engine_capacity__c, Model__c, PriceUSD__c, Vin_Code__c,
        (SELECT Id, Name FROM Attachments)
        FROM Product2
        WHERE Satus__c = 'In stock'
        ORDER BY Engine_capacity__c
        ];
    }
    
    public static List<Product2> getCarsByModel(String carModel){
        String searchString = '%' + carModel + '%';
        return [SELECT Id, Name, Build_Data__c, Engine_capacity__c, Model__c, PriceUSD__c, Vin_Code__c,
        (SELECT Id, Name FROM Attachments)
        FROM Product2
        WHERE Model__c like :searchString       
    ];
}
    @AuraEnabled
    public static List<Product2> getCarsFromCarCenterByCarCenterId(Id CarCenterId){
        return [SELECT Id, Name, Build_Data__c, Engine_capacity__c, Model__c, PriceUSD__c, Vin_Code__c
        FROM Product2
        WHERE Car_Center__c =: CarCenterId
        ];
    }
    public carListManager() {
        
    }
}
