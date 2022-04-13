public with sharing class CarCenterManager {
    public CarCenterManager() {

    }
    @AuraEnabled
    public static List<Car_Center__c> getCarCenters(){
       return [SELECT Id, Name FROM Car_Center__c];
    }
    
}
