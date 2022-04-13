public with sharing class carListService {
    public static List<carsListController.ProductWrapper> getCars(){
        System.debug('getCars carListService');
        return wrapperFormation(carListManager.getCars());       
    }
    public static List<carsListController.ProductWrapper> getCarsByModel(String carModel){
        return wrapperFormation(carListManager.getCarsByModel(carModel));
    }
    public static List<carsListController.ProductWrapper> wrapperFormation(List<Product2> products){
        System.debug('wrapperFormation carListService');
        List<carsListController.ProductWrapper> productsWrappers = new List<carsListController.ProductWrapper>();       
        for(Product2 product : products){
            carsListController.ProductWrapper productWrapper = new carsListController.ProductWrapper();
            productWrapper.product = product;
            productWrapper.uaPrice = ExchangeRateService.getUaPriceFromUsd(product.PriceUSD__c);
            productWrapper.attachmentId = product.Attachments[0].Id;  
            productsWrappers.add(productWrapper);       
        }
        return productsWrappers; 
    }
    public carListService() {        
    }
}
