@isTest
public with sharing class contactUpdateCreateHelperTest {
    
    public static testMethod void doContactUpdateCreateHelperTest(){
        
        Case c = new Case();
            c.Origin = 'Phone';
        insert c;

        contactUpdateCreateHelper.getContactIdEnhanced(c.Id, 'ContactId');
    }

}
