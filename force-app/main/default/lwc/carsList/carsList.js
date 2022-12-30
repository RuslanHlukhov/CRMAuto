import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCars from '@salesforce/apex/carsListController.getCars';
import getCarsByModel from '@salesforce/apex/carsListController.getCarsByModel';
import SortByCapacity from '@salesforce/apex/carsListController.getCarsByEngineCapacity';
import SortByBuildDate from '@salesforce/apex/carsListController.getCarsByBuildData';
import MoreInformationLabel from '@salesforce/label/c.MoreInformation';
import SortByDateAddedLabel from '@salesforce/label/c.SortByDateAdded';
import SortByCapacityLabel from '@salesforce/label/c.SortByCapacity';
import SortByBuildDateLabel from '@salesforce/label/c.SortByBuildDate';
import BuyCar from '@salesforce/label/c.BuyCar';
import SearchCar from '@salesforce/label/c.SearchCar';
import OpportunityController from '@salesforce/apex/OpportunityController.createAccountAndOpportunity';

export default class CarsList extends LightningElement {

    label = {
        MoreInformationLabel,
        SortByDateAddedLabel,
        SortByCapacityLabel,
        SortByBuildDateLabel,
        SearchCar,
        BuyCar
    };
    
    showData = false;
    recordsList = [];
    products;
    errors;
    @track firstname;
    @track lastname;
    @track phone;
    @track email;
    @track carCenter;
    @track text;
    @track price;
    @track product;
    @track selectCar;
    @track centerName;
    @track selectedCar;
    @track selectedCarVin;
    priceLisk = [];
    @track centerList = [];
    @track isShowModal = false;
    @track isShowModalByCar = false;
    @track isUKRActive = false;
    @track isDollarActive = true;
    connectedCallback() {
        this.loadCars();
    }

    
    loadCars() {
        getCars()
            .then(result => {
                this.showData = false;
                this.recordsList = [];
                for (let key in result) {
                    let fotoUrl = 'https://resourceful-bear-swh5o0-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=' + result[key].attachmentId;
                    this.recordsList.push({
                        Name: result[key].product.Name,
                        Model: result[key].product.Model__c,
                        Build: result[key].product.Build_Data__c,
                        EngineCapacity: result[key].product.Engine_capacity__c,
                        Price: result[key].product.PriceUSD__c,
                        Vin: result[key].product.Vin_Code__c,
                        Photo: fotoUrl,
                        PriceUa: result[key].uaPrice,
                        CarCenter:result[key].product.Car_Center__c
                    });            
                }
                this.showData = true;
            })
            .catch(error => {
                this.error = error;
            });
    }

    loadCarByCapacity(){
        console.log('testCarByCapasity');
        SortByCapacity()
        .then(result => {
            this.showData = false;
            this.recordsList = [];
            for (let key in result) {
                let fotoUrl = 'https://resourceful-bear-swh5o0-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=' + result[key].attachmentId;
                this.recordsList.push({
                    Name: result[key].product.Name,
                    Model: result[key].product.Model__c,
                    Build: result[key].product.Build_Data__c,
                    EngineCapacity: result[key].product.Engine_capacity__c,
                    Price: result[key].product.PriceUSD__c,
                    Vin: result[key].product.Vin_Code__c,
                    Photo: fotoUrl,
                    PriceUa: result[key].uaPrice, 
                    CarCenter:result[key].product.Car_Center__c
                });            
            }
            this.showData = true;
        })
        .catch(error => {
            this.error = error;
        });
        
    }
    loadCarByBuildDate(){
        SortByBuildDate()
        .then(result => {
            this.showData = false;
            this.recordsList = [];
            for (let key in result) {
                let fotoUrl = 'https://resourceful-bear-swh5o0-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=' + result[key].attachmentId;
                this.recordsList.push({
                    Name: result[key].product.Name,
                    Model: result[key].product.Model__c,
                    Build: result[key].product.Build_Data__c,
                    EngineCapacity: result[key].product.Engine_capacity__c,
                    Price: result[key].product.PriceUSD__c,
                    Vin: result[key].product.Vin_Code__c,
                    Photo: fotoUrl,
                    PriceUa: result[key].uaPrice,
                    CarCenter:result[key].product.Car_Center__c
                });            
            }
            this.showData = true;
        })
        .catch(error => {
            this.error = error;
        });
    }

    handleKeyChange(event) {
        this.centerName = event.target.value;
        getCarsByModel({ carModel: this.centerName })
            .then(result => {
                if (result) {
                    this.showData = false;
                    this.recordsList = [];
                    for (let key in result) {
                        let fotoUrl = 'https://resourceful-bear-swh5o0-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=' + result[key].attachmentId;
                        this.recordsList.push({
                            Name: result[key].product.Name,
                            Model: result[key].product.Model__c,
                            Build: result[key].product.Build_Data__c,
                            EngineCapacity: result[key].product.Engine_capacity__c,
                            Price: result[key].product.PriceUSD__c,
                            Vin: result[key].product.Vin_Code__c,
                            Photo: fotoUrl,
                            PriceUa: result[key].uaPrice,
                            CarCenter:result[key].product.Car_Center__c
                        });
                    }
                    this.showData = true;
                } else if (error) {
                    console.log(error);
                }
            }).catch(error => {
                this.error = error;
            });
    }
    getSelectedCarByVin(){
        for(let key in this.recordsList){
            if(this.recordsList[key].Vin == this.selectedCarVin){
                this.selectedCar = this.recordsList[key];
                break;
            }
        }
    }
    
    showModalBox(event) {  
        this.selectedCarVin = event.currentTarget.dataset.value;
        this.getSelectedCarByVin();
        this.isShowModal = true;  
    }
    showModalByCar(event){
        console.log('Test');
        this.selectedCarVin = event.currentTarget.dataset.value;
        this.getSelectedCarByVin();
        this.isShowModalByCar = true;  
     }
    
    hideModalBox() {  
        this.isShowModal = false;
    }
    hideModalBoxByCar(){
         this.isShowModalByCar = false;
    }
    handleUaPrice(event) {
        console.log('TestUACurrency');
        this.isUKRActive = true;
        this.isDollarActive = false;
    }
    handleUsdPrice(event){
        console.log('TestUSACurrency');
        this.isDollarActive = true;
        this.isUKRActive = false;
    }
    buyCar(){
        OpportunityController({
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            email: this.email,
            price:this.price,
            carCenter:this.carCenter,
            product: this.selectCar        
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
    handleTextChange(event) {
        this.text = event.target.value;
    }
    handleCarCenter(event){
        this.carCenter = event.target.innerText;
    }
    handlePrice(event){
        this.price = event.target.innerText;
    }
    handleCar(event){
        this.selectCar = event.target.innerText;
        console.log(this.selectCar);
    }
    testcarCenter(event){
        this.selectCar = event.target.innerText;
        console.log(this.selectCar);
    }

}