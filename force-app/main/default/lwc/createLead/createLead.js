import { LightningElement, track, wire } from 'lwc';
import Contact from '@salesforce/label/c.Contact';
import AboutUsLabel from '@salesforce/label/c.AboutUs';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import LASTNAME_FIELD from '@salesforce/schema/Lead.LastName';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import CARCENTER_FIELD from '@salesforce/schema/Lead.Car_Center__c';
import SUBJECT_FIELD from '@salesforce/schema/Lead.Subject__c';
import TEXT_FIELD from '@salesforce/schema/Lead.Text__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createClient from '@salesforce/apex/ClientConroller.createClient';

export default class createLead extends LightningElement {
    label = {
        AboutUsLabel,
        Contact,
    };

    @track name = NAME_FIELD;
    @track phone = PHONE_FIELD;
    @track email = EMAIL_FIELD;
    @track company = COMPANY_FIELD;
    @track carcenterId = CARCENTER_FIELD;
    @track subject = SUBJECT_FIELD;
    @track text = TEXT_FIELD;
    @track lastname = LASTNAME_FIELD;
    rec = {
        Name: this.name,
        Phone: this.phone,
        Email: this.email,
        Company: this.company,
        CarCenterId: this.carcenterId,
        Subject: this.subject,
        Text: this.text,
        LastName: this.lastname
    }
    handleCarCenterChange(event) {
        try {
            this.rec.CarCenterId = event.target.value;
            console.log("CarCenter", this.rec.CarCenterId);
        } catch (error) {
            console.log('errorCarCenter', error);
        }
    }
    handleNameChange(event) {
        this.rec.Name = event.target.value;
        console.log("Name", this.rec.Name);
    }
    handleLstnChange(event) {
        this.rec.LastName = event.target.value;
        console.log("LastName", this.rec.LastName);
    }
    handlePhnChange(event) {
        this.rec.Phone = event.target.value;
        console.log("Phone", this.rec.Phone);
    }
    handleCmpnChange(event) {
        this.rec.Company = event.target.value;
        console.log("Company", this.rec.Company);
    }
    handleEmailChange(event) {
        this.rec.Email = event.target.value;
        console.log("Email", this.rec.Email);
    }
    handleSubjectChange(event) {
        this.rec.Subject = event.target.value;
        console.log("Subject", this.rec.Subject);
    }
    handleTextChange(event) {
        this.rec.Text = event.target.value;
        console.log("Text", this.rec.Text);
    }
    handleClick() {
        createClient({ name: this.rec.Name, lastName: this.rec.LastName, phone: this.rec.Phone, email: this.rec.Email, subject: this.rec.Subject, text: this.rec.Text, carCenterId: this.rec.CarCenterId })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.rec.Name = '';
                    this.rec.LastName = '';
                    this.rec.Phone = '';
                    this.rec.Email = '';
                    this.rec.Company = '';
                    this.rec.CarCenterId = '';
                    this.rec.Subject = '';
                    this.rec.Text = '';
                    // this.dispatchEvent(
                    //     new ShowToastEvent({
                    //         title: 'Success',
                    //         message: 'Account created',
                    //         variant: 'success',
                            
                    //     }),
                        
                    // );
                    [...this.template
                        .querySelectorAll('lightning-input')]
                        .forEach((input) => { input.value = ''; });
                }

                console.log(JSON.stringify(result));
                console.log("result", this.message);
                console.log(result);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
}