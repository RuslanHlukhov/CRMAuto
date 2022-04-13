@isTest
public with sharing class TestClassForTestDriveManager {
    public TestClassForTestDriveManager() {
        Test_Drive__c testDrive = new  Test_Drive__c(First_Name__c='John', Last_Name__c='Smith', Phone__c='380935627334', Email__c='test@gmail.com', Car_Center__c='a0K7Q000000Hu2gUAC', Product__c='01t7Q000000BoinQAC', Text__c='testext', Date__c=datetime.newInstance(2014, 9, 15, 12, 30, 0));
        insert testDrive;
        Database.SaveResult result = Database.insert(testDrive, false);
        System.assert(result.isSuccess());
    }
}
