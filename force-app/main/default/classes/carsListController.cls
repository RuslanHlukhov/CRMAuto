public with sharing class carsListController { 
   @AuraEnabled (cacheable = true)
    public static List<ProductWrapper> getCars(){
        try {
            return carListService.getCars();
          } catch (Exception e) {
              throw new AuraHandledException(e.getMessage());
          }
    }
    @AuraEnabled
    public static List<ProductWrapper> getCarsByEngineCapacity(){
        try {
          return carListService.getCarsByEngineCapacity(); 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<ProductWrapper> getCarsByBuildData(){
        try {
            return carListService.getCarsByBuildData();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<ProductWrapper>getCarsByModel(String carModel){
        try {
            return carListService.getCarsByModel(carModel);
          } catch (Exception e) {
              throw new AuraHandledException(e.getMessage());
          }    
    }
    public class ProductWrapper{
        @AuraEnabled
        public Product2 product;
        @AuraEnabled
        public String attachmentId;
        @AuraEnabled
        public String uaPrice;
    

        public ProductWrapper(){

        }
    }   
}
