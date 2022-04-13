public with sharing class Translate {
    @AuraEnabled
    public static User translateENG(){
    User currentUsers = [SELECT Id, LocaleSidKey, LanguageLocaleKey FROM User where Id = :UserInfo.getUserId()];
        currentUsers.LanguageLocaleKey = 'en_US';
        update currentUsers;
        return currentUsers;
    }
    @AuraEnabled
    public static User translateRU(){
        User currentUsers = [SELECT Id, LocaleSidKey, LanguageLocaleKey FROM User where Id = :UserInfo.getUserId()];
            currentUsers.LanguageLocaleKey = 'ru';
            update currentUsers;
            return currentUsers;
        }

    public Translate() {

    }
}
