public with sharing class carsListController { 
   @AuraEnabled (cacheable = true)
    public static List<ProductWrapper> getCars(){
        System.debug('getCars carsListController');
        return carListService.getCars();
    }
    @AuraEnabled
    public static List<ProductWrapper>getCarsByModel(String carModel){
        return carListService.getCarsByModel(carModel);
    }
    public class ProductWrapper{
        @AuraEnabled
        public Product2 product;
        @AuraEnabled
        public String attachmentId;
        @AuraEnabled
        public String UaPrice;
    

        public ProductWrapper(){

        }
    }   
}
