public with sharing class contactUpdateCreateHelper {
    
    @AuraEnabled
    public static String getContactIdEnhanced(Id recordId, String field){
        
        String obj = recordId.getSObjectType().getDescribe().getName();
                    
        String q = 'SELECT Id, ' + field + ' FROM ' + obj + ' WHERE Id = ' + '\'' + recordId + '\'';
        
        sObject sob = Database.query(q);
        
        String result = (String) sob.get(field);

        return result;
    }
}
