import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createTestDriveClient from '@salesforce/apex/TestDriveClientController.createTestDriveClient';
import getCarCenters from '@salesforce/apex/CarCenterManager.getCarCenters';
import getCarsFromCarCenterByCarCenterId from '@salesforce/apex/carListManager.getCarsFromCarCenterByCarCenterId';
import testDrive from '@salesforce/label/c.TestDrive';

export default class TestDrive extends LightningElement {
    label = {
        testDrive
    }

    @track carCenterOptionsToPush = [];
    @track selectedCarId;
    @track selectedCarCenterId;
    @track carCentersFromDB;
    @track carsFromCarCenterFromDB;
    @track carCenterOptions = [];
    @track carsToPush = [];
    @track carsOptions = [];
    @track firstname;
    @track lastname;
    @track phone;
    @track email;
    @track text;
    @track carcenterid;
    @track product;
    @track testDriveStartDate;
    @track dateNow;

    connectedCallback() {
        this.selectCarCetnerList();
    }
    //Best practies
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
        console.log('selectedCarId ', this.selectedCarId);
        console.log('date ', this.testDriveStartDate);


        createTestDriveClient({
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            email: this.email,
            carCenter: this.selectedCarCenterId,
            product: this.selectedCarId,
            text:this.text,
            testDriveStartDate: this.testDriveStartDate,
        })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Application created',
                            variant:'success',
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
                        title: 'Error',
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
    handleProductChange(event) {
        console.log('handleProductChange');
        this.carsOptions = this.carsToPush;
        console.log("this.carsOptions", JSON.stringify(this.carsOptions));
    }
    handleProductSelect(event){
        console.log('selectedCarId');
        console.log(event.target.value);
        this.selectedCarId = event.target.value;
        console.log(this.selectedCarId);

    }
    handleFirstNameChange(event) {
        this.firstname = event.target.value;
    }
    handleLastNameChange(event) {
        this.lastname = event.target.value;
    }
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    handleDateChange(event) {
        this.testDriveStartDate = event.target.value;
    }
    handleTextChange(event) {
        this.text = event.target.value;
    }
    dateNow(){
        timeInMs = Date.now();
    }
}