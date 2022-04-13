public with sharing class LabelTranslatorTestController {
    @AuraEnabled(cacheable=true)
    public static string getLabelTranslator(String label,String language) {
        try {
            PageReference r = Page.AutoCRM;// the vf page
            r.getParameters().put('language', language);
            r.getParameters().put('label', label);
            return r.getContent().toString();
        } catch(Exception e){
            return label;
        }  
    }
}
