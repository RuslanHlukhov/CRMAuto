public with sharing class carsMapController {
        @AuraEnabled
        public static string getAllOrder(){ 
            string query = 'select id,Name,Locations__c,Phone__c, Address__c from Car_Center__c where Locations__longitude__s != null and Locations__latitude__s != null limit 10';
            string baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
            list< map<string,object>> markerList = new list< map<string,object>>();
            for(Car_Center__c order : Database.query(query)){          
                if(order.Locations__c != null){
    
                    map<string,object> markerMap = new map<string,object>();
                    markerMap.put('title', order.Phone__c + ' ' + order.name );
                    markerMap.put('{phone}',order.Phone__c != null ? order.Phone__c : '');
                    map<string,object> addressMap = new map<string,object>();
                    addressMap.put('Latitude',order.Locations__c.getLatitude());
                    addressMap.put('Longitude',order.Locations__c.getLongitude());
                    markerMap.put('location',addressMap);
                    markerList.add(markerMap);  
                }
            } 
            system.debug('+++++++'+JSON.serialize(markerList));
            return JSON.serialize(markerList);  
            
        } 
    
}
