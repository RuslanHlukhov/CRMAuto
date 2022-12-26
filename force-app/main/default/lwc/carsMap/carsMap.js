import { LightningElement, track } from 'lwc';
import getAllOrder from '@salesforce/apex/carsMapController.getAllOrder';
import DealershipCenter from '@salesforce/label/c.Dealership_center';
import MoreInformation from '@salesforce/label/c.MoreInformation';

export default class carsMap extends LightningElement {
  label = {
    DealershipCenter,
    MoreInformation
  };
  @track loaded = true;
  showData = false;
  mapMarkers;
  markersTitle;
  orders;
  connectedCallback() {
    this.loadMap()
    this.loaded = false;
  }
  loadMap() {
    getAllOrder()
      .then(result => {
        this.mapMarkers = JSON.parse(result);
        // console.log(result);
        this.markersTitle = "Dealers";
        this.orders = result;
        this.loaded = true;
        // console.log(this.showData);
      })
      .catch(error => {
        this.error = error;
        this.loaded = false;
      });
  }
}