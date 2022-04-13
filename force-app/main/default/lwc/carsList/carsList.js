import { LightningElement, track, wire } from 'lwc';
import getCars from '@salesforce/apex/carsListController.getCars';
import getCarsByModel from '@salesforce/apex/carsListController.getCarsByModel';
import Search from '@salesforce/label/c.Search';
import ModelCar from '@salesforce/label/c.Model';
export default class CarsList extends LightningElement {

    label = {
        ModelCar,
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
    @track isDollarActive = false;
    connectedCallback() {
        this.loadCars();
    }
    loadCars() {
        getCars()
            .then(result => {
                for (let key in result) {
                    let fotoUrl = 'https://resourceful-bear-swh5o0-dev-ed--c.documentforce.com/servlet/servlet.FileDownload?file=' + result[key].attachmentId;
                    this.recordsList.push({
                        Name: result[key].product.Name,
                        Model: result[key].product.Model__c,
                        Build: result[key].product.Build_Data__c,
                        EngineCapacity: result[key].product.Engine_capacity__c,
                        Price: result[key].product.PriceUSD__c,
                        Vin: result[key].product.Vin_Code__c,
                        Photo: fotoUrl
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
                            Photo: fotoUrl
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
}