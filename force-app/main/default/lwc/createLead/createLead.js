import { LightningElement, track, wire } from 'lwc';
import Contact from '@salesforce/label/c.Contact';
import AboutUsLabel from '@salesforce/label/c.AboutUs';
import Name from '@salesforce/label/c.Name';
import LastName from '@salesforce/label/c.LastName';
import Phone from '@salesforce/label/c.Phone';
import CarCerter from '@salesforce/label/c.CarCerter';
import Text from '@salesforce/label/c.Text';
import Send from '@salesforce/label/c.Send';
import Subject from '@salesforce/label/c.Subject';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createClient from '@salesforce/apex/ClientConroller.createClient';
import getCarCenters from '@salesforce/apex/CarCenterManager.getCarCenters';
import getCarsFromCarCenterByCarCenterId from '@salesforce/apex/carListManager.getCarsFromCarCenterByCarCenterId';

export default class createLead extends LightningElement {
    label = {
        AboutUsLabel,
        Contact,
        Name,
        LastName,
        Phone,
        CarCerter,
        Text,
        Send,
        Subject
    };

    @track name;
    @track phone;
    @track email;
    @track company;
    @track subject;
    @track text;
    @track lastname;
    @track carCenterOptions = [];
    @track selectedCarCenterId;
    @track carsFromCarCenterFromDB;
    @track carCenterOptionsToPush = [];

    connectedCallback() {
        this.selectCarCetnerList();
    }
    selectCarCetnerList() {
        getCarCenters({})
            .then(result => {
                this.carCentersFromDB = result;
                for (let key in this.carCentersFromDB) {
                    this.carCenterOptionsToPush.push({
                        label: this.carCentersFromDB[key].Name, value: this.carCentersFromDB[key].Id
                    });
                }
            });
    }

    handleCarCenter(event) {
        this.selectedCarCenterId = event.target.value;
        getCarsFromCarCenterByCarCenterId({
            CarCenterId: this.selectedCarCenterId
        })
        .then(result => {
            this.carsFromCarCenterFromDB = result;
            for(let key in this.carsFromCarCenterFromDB){
                this.carsToPush.push({
                    label: this.carsFromCarCenterFromDB[key].Model__c + ' ' + this.carsFromCarCenterFromDB[key].Vin_Code__c, value: this.carsFromCarCenterFromDB[key].Id
                })
            }
        })
        console.log("Car Center", this.selectedCarCenterId);
    }
    
    handleClick() {
        createClient({ 
            name: this.name, 
            lastName: this.lastname, 
            phone: this.phone, 
            email: this.email, 
            subject: this.subject, 
            text: this.text, 
            carCenterId: this.selectedCarCenterId, 
        })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                            
                        }),
                        
                    );
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
    handleClickOnCarCenters(event){
        console.log('handleClickOnCarCenters');
        this.carCenterOptions = this.carCenterOptionsToPush;
        console.log('this.carCenterOptions: ', JSON.stringify(this.carCenterOptions));
        
    }
    handleNameChange(event) {
        this.name = event.target.value;
    }
    handleLstnChange(event) {
        this.lastname = event.target.value;
    }
    handlePhnChange(event) {
        this.phone = event.target.value;
    }
    handleCmpnChange(event) {
        this.company = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    handleSubjectChange(event) {
        this.subject = event.target.value;
    }
    handleTextChange(event) {
        this.text = event.target.value;
    }
}