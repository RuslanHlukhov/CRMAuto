import { LightningElement, track } from 'lwc';
import getCars from '@salesforce/apex/carsListController.getCars';
import getCarsByModel from '@salesforce/apex/carsListController.getCarsByModel';
import SortByCapacity from '@salesforce/apex/carsListController.getCarsByEngineCapacity';
import SortByBuildDate from '@salesforce/apex/carsListController.getCarsByBuildData';
import SortByDateAddedLabel from '@salesforce/label/c.SortByDateAdded';
import Search from '@salesforce/label/c.Search';
import ModelCarLabel from '@salesforce/label/c.Model';
import FollowUs from '@salesforce/label/c.Follow_Us';
import DealershipCenter from '@salesforce/label/c.Dealership_center';
import MoreInformation from '@salesforce/label/c.MoreInformation';
export default class CarsList extends LightningElement {

    label = {
        ModelCarLabel,
        SortByDateAddedLabel,
        FollowUs,
        DealershipCenter,
        MoreInformation
    };
    
    showData = false;
    recordsList = [];
    products;
    errors;
    @track centerName;
    @track selectedCar;
    @track selectedCarVin;
    priceLisk = [];
    @track centerList = [];
    @track isShowModal = false;
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
                        PriceUa: result[key].uaPrice
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
                    PriceUa: result[key].uaPrice
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
                    PriceUa: result[key].uaPrice
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
                            PriceUa: result[key].uaPrice
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
    
    hideModalBox() {  
        this.isShowModal = false;
    }
    label = {
        Search
    };

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

}