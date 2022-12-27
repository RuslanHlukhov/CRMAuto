public with sharing class TestDriveClientController {
    public TestDriveClientController() {

    }
    @AuraEnabled
    public static Boolean createTestDriveClient(
        String firstname, 
        String lastname, 
        String phone, 
        String email, 
        String carCenter, 
        String product, 
        String text, 
        String testDriveStartDate){
        return TestDriveService.createTestDriveClient(
            firstname, 
            lastname, 
            phone, 
            email, 
            carCenter, 
            product, 
            text, 
            testDriveStartDate);
    }
}
