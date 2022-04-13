public with sharing class TestDriveManager {
    public TestDriveManager() {

    }
    public static Test_Drive__c createApplicationTestDrive(Id leadId, String carCenter, String product, String text, Datetime correctDate){
        Test_Drive__c testDrive = new Test_Drive__c(
            Lead__c = leadId,
            Car_Center__c = carCenter,
            Product__c = product,
            Text__c = text,
            Date__c = correctDate
        );
        insert testDrive;
        return testDrive;
    }
}
