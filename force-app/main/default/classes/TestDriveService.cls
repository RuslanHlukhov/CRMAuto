public with sharing class TestDriveService {
    public TestDriveService() {

    }
    public static Datetime formDatetimeFromStringGTM2(String dateToForm) {
        if (!String.isBlank(dateToForm)) {
            String correctDate = dateToForm.replace('T', ' ').substringBefore('.');  
            return Datetime.valueOf(correctDate).addHours(1);
        }else{
            return null;
        }     
    }
    public static Boolean createTestDriveClient(String firstname, String lastname, String phone, String email, String carCenter, String product, String text, String testDriveStartDate){
        Lead newLead = LeadService.createLead(firstname, lastName, phone, email);
        Datetime  correctDate = formDatetimeFromStringGTM2(testDriveStartDate);
        Test_Drive__c newTestDrive = TestDriveManager.createApplicationTestDrive(newLead.Id, carCenter, product, text, correctDate);
        return true;
    }
}
