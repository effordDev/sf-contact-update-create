import { LightningElement, api, wire } from 'lwc';
import { getRecord, updateRecord, getFieldValue, createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getContactId from '@salesforce/apex/contactUpdateCreateHelper.getContactIdEnhanced'


export default class ContactUpdateCreate extends LightningElement {

    @api recordId
    @api contactAPI
    @api title 

    contactId = ''

    connectedCallback() {
        this.init()
    }

    async init() {
        this.contactId = await getContactId({ recordId: this.recordId, field: this.contactAPI})
    }
    
    get buttonLabel() {
        return this.contactId ? 'Update' : 'Create'
    }

    @api async run() {

        const FirstName = this.template.querySelector('.FirstName').value
        const LastName = this.template.querySelector('.LastName').value
        const Phone = this.template.querySelector('.Phone').value
        const Email = this.template.querySelector('.Email').value
        
        if (this.contactId) {

            const contact = {
                fields: {
                    Id: this.contactId,
                    FirstName,
                    LastName,
                    Phone,
                    Email
                }
            }
    
            await updateRecord(contact)
            
        } else {

            const contact = {
                apiName: "Contact",
                fields: {
                    FirstName,
                    LastName,
                    Phone,
                    Email
                }
            }
            
            const result = await createRecord(contact)

            this.contactId = result.id

            const record = {
                fields: {
                    Id: this.recordId,
                    [this.contactAPI]: this.contactId
                }
            }

            await updateRecord(record)
        }

        this.successToast('Success')
    }

    successToast(m) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: m,
                variant: 'success',
            })
        );
    }
}